import type { GameContext, Powerup, PowerupEffect } from "@/types/powerups";
import { MAX_RETRIGGERS_PER_LETTER } from "@/utils/constants";
import { isVowel } from "@/utils/tiles";

export interface ScoreTotals {
  basePoints: number;
  multiplier: number;
  totalScore: number;
}

export const ZERO_TOTALS: ScoreTotals = {
  basePoints: 0,
  multiplier: 0,
  totalScore: 0,
};

/** What caused a step. Drives which elements shake. */
export type ScoreStepSource =
  /** A tile contributing its own points (consonant) or multiplier (vowel). */
  | { kind: "tile"; tileIndex: number }
  | { kind: "letterPowerup"; tileIndex: number; powerupIndex: number }
  | { kind: "wordPowerup"; powerupIndex: number };

export interface ScoreStep {
  source: ScoreStepSource;
  delta: { points: number; multiplier: number };
  /** Running totals after this step. */
  after: ScoreTotals;
}

export interface ScoreSequence {
  steps: ScoreStep[];
  result: ScoreTotals;
}

type ScoredTile = { letter: string; points: number };

/**
 * Pure. Tile contributions only — no powerups, no hooks. Safe to call in
 * render; this is what the score display shows while you are selecting.
 */
export function previewWord(tiles: ScoredTile[]): ScoreTotals {
  let basePoints = 0;
  let multiplier = 0;
  for (const tile of tiles) {
    if (isVowel(tile.letter)) multiplier += tile.points;
    else basePoints += tile.points;
  }
  return { basePoints, multiplier, totalScore: basePoints * multiplier };
}

/**
 * IMPURE. Runs every powerup hook exactly once, in owned order. Several
 * powerups mutate closure state inside their hooks (gangster, climber,
 * pickpocket, sharpshooter), so this must only ever be called from a
 * submit — never during render, never inside a memo.
 */
export function buildScoreSequence(
  tiles: ScoredTile[],
  powerups: Powerup[],
  makeContext: (runningMultiplier: number) => GameContext,
): ScoreSequence {
  const steps: ScoreStep[] = [];
  let basePoints = 0;
  let multiplier = 0;

  const push = (
    source: ScoreStepSource,
    fx: PowerupEffect | null | undefined,
  ) => {
    if (!fx) return;
    const points = fx.points ?? 0;
    const mult = fx.multiplier ?? 0;
    // A powerup that fired but changed nothing does not get a step, and so
    // does not shake. Granting a retrigger counts as helping.
    if (points === 0 && mult === 0 && !fx.retrigger) return;
    basePoints += points;
    multiplier += mult;
    steps.push({
      source,
      delta: { points, multiplier: mult },
      after: { basePoints, multiplier, totalScore: basePoints * multiplier },
    });
  };

  /**
   * One pass of a tile: its own contribution, then each powerup's
   * onLetterScored left to right. Returns the retriggers this pass granted.
   */
  const scoreLetterOnce = (tile: ScoredTile, index: number): number => {
    push(
      { kind: "tile", tileIndex: index },
      isVowel(tile.letter)
        ? { multiplier: tile.points }
        : { points: tile.points },
    );

    let retriggers = 0;
    for (let p = 0; p < powerups.length; p++) {
      // Always call the hook — some powerups mutate state and return null.
      const fx = powerups[p].onLetterScored?.(makeContext(multiplier), {
        letter: tile.letter,
        index,
        points: tile.points,
        allTiles: tiles,
      });
      retriggers += fx?.retrigger ?? 0;
      push({ kind: "letterPowerup", tileIndex: index, powerupIndex: p }, fx);
    }
    return retriggers;
  };

  for (let i = 0; i < tiles.length; i++) {
    // Only the first pass grants retriggers, or a retrigger powerup would
    // re-grant on every replay and never terminate.
    const extraPasses = Math.min(
      scoreLetterOnce(tiles[i], i),
      MAX_RETRIGGERS_PER_LETTER,
    );
    for (let r = 0; r < extraPasses; r++) scoreLetterOnce(tiles[i], i);
  }

  for (let p = 0; p < powerups.length; p++) {
    push(
      { kind: "wordPowerup", powerupIndex: p },
      powerups[p].onWordScored?.(makeContext(multiplier)),
    );
  }

  return {
    steps,
    result: steps.length ? steps[steps.length - 1].after : ZERO_TOTALS,
  };
}
