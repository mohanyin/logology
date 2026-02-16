import type { GameContext, Powerup } from "@/types/powerups";

export function scoreWord(
  tiles: { letter: string; points: number }[],
  powerups: Powerup[],
  ctx: GameContext,
): { totalScore: number; basePoints: number; multiplier: number } {
  let basePoints = 0;
  let multiplier = tiles.length;

  // 1. Apply starting bonuses
  for (const p of powerups) {
    const fx = p.getStartingBonus?.(ctx);
    if (fx) {
      basePoints += fx.points ?? 0;
      multiplier += fx.multiplier ?? 0;
    }
  }

  // 2. Score each letter + run onLetterScored hooks
  for (let i = 0; i < tiles.length; i++) {
    basePoints += tiles[i].points;
    for (const p of powerups) {
      const fx = p.onLetterScored?.(ctx, {
        letter: tiles[i].letter,
        index: i,
        points: tiles[i].points,
        allTiles: tiles,
      });
      if (fx) {
        basePoints += fx.points ?? 0;
        multiplier += fx.multiplier ?? 0;
      }
    }
  }

  // 3. Run onWordScored hooks
  for (const p of powerups) {
    const fx = p.onWordScored?.(ctx);
    if (fx) {
      basePoints += fx.points ?? 0;
      multiplier += fx.multiplier ?? 0;
    }
  }

  return { totalScore: basePoints * multiplier, basePoints, multiplier };
}
