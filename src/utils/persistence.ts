import { getDefaultStore } from "jotai";
import {
  boardAtom,
  goldAtom,
  nextTileAtom,
  playedWordsAtom,
  powerupsAtom,
  roundAtom,
  scoreAtom,
  shopOffersAtom,
  shufflesRemainingAtom,
  tilesAtom,
  wordsRemainingAtom,
} from "@/atoms/game";
import { createPowerup } from "@/powerups/index";
import type { PowerupState } from "@/types/powerups";
import { BOARD_TILE_COUNT, GRID_SIZE } from "@/utils/constants";
import type { Tile } from "@/utils/tiles";

const SAVE_VERSION = 1;
const STORAGE_KEY = "logology.run";

interface SavedPowerup {
  name: string;
  state?: PowerupState;
}

interface SavedRun {
  version: number;
  round: number;
  score: number;
  gold: number;
  wordsRemaining: number;
  shufflesRemaining: number;
  tiles: Tile[];
  nextTile: number;
  /** Flat, row-major. null where the bag ran dry. */
  board: (Tile | null)[];
  playedWords: string[];
  /** Ordered — scoring reports powerups by index into this array. */
  powerups: SavedPowerup[];
  shopOffers: string[] | null;
}

/**
 * Snapshots the current run to storage.
 *
 * Called explicitly rather than by subscribing to the atoms: powerups mutate
 * their state in place without ever replacing the array in powerupsAtom, so
 * there is no atom write that marks a powerup bonus changing.
 */
export function saveRun(): void {
  const store = getDefaultStore();
  const offers = store.get(shopOffersAtom);

  const run: SavedRun = {
    version: SAVE_VERSION,
    round: store.get(roundAtom),
    score: store.get(scoreAtom),
    gold: store.get(goldAtom),
    wordsRemaining: store.get(wordsRemainingAtom),
    shufflesRemaining: store.get(shufflesRemainingAtom),
    tiles: store.get(tilesAtom),
    nextTile: store.get(nextTileAtom),
    board: store.get(boardAtom).flat(),
    playedWords: store.get(playedWordsAtom),
    powerups: store.get(powerupsAtom).map((p) => ({
      name: p.name,
      state: p.getState?.(),
    })),
    shopOffers: offers ? offers.map((p) => p.name) : null,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(run));
  } catch {
    // Private browsing or a full quota. Not worth interrupting play over.
  }
}

export function clearRun(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

const isTile = (t: unknown): t is Tile =>
  typeof t === "object" &&
  t !== null &&
  typeof (t as Tile).letter === "string" &&
  Number.isFinite((t as Tile).points);

function parse(raw: string): SavedRun | null {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof data !== "object" || data === null) return null;

  const run = data as SavedRun;
  if (run.version !== SAVE_VERSION) return null;

  const numbers = [
    run.round,
    run.score,
    run.gold,
    run.wordsRemaining,
    run.shufflesRemaining,
    run.nextTile,
  ];
  if (!numbers.every((n) => Number.isFinite(n))) return null;

  if (!Array.isArray(run.tiles) || !run.tiles.every(isTile)) return null;
  if (!Array.isArray(run.board) || run.board.length !== BOARD_TILE_COUNT) {
    return null;
  }
  if (!run.board.every((t) => t === null || isTile(t))) return null;
  if (!Array.isArray(run.playedWords)) return null;
  if (!Array.isArray(run.powerups)) return null;

  return run;
}

/**
 * Restores a saved run into the atoms. Returns false if there was nothing to
 * restore or the save no longer fits the code — a powerup that has since been
 * deleted or renamed, a bumped format — in which case the save is dropped and
 * play starts fresh.
 */
export function loadRun(): boolean {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
  if (!raw) return false;

  const run = parse(raw);
  if (!run) {
    clearRun();
    return false;
  }

  // Rebuild powerups before touching any atom, so an unknown name aborts the
  // whole restore rather than leaving the run half-applied.
  const powerups = [];
  for (const saved of run.powerups) {
    const powerup = createPowerup(saved.name, saved.state);
    if (!powerup) {
      clearRun();
      return false;
    }
    powerups.push(powerup);
  }

  const offers = [];
  for (const name of run.shopOffers ?? []) {
    const powerup = createPowerup(name);
    if (!powerup) {
      clearRun();
      return false;
    }
    offers.push(powerup);
  }

  const store = getDefaultStore();
  store.set(roundAtom, run.round);
  store.set(scoreAtom, run.score);
  store.set(goldAtom, run.gold);
  store.set(wordsRemainingAtom, run.wordsRemaining);
  store.set(shufflesRemainingAtom, run.shufflesRemaining);
  store.set(tilesAtom, run.tiles);
  store.set(nextTileAtom, run.nextTile);
  store.set(playedWordsAtom, run.playedWords);
  store.set(powerupsAtom, powerups);
  store.set(shopOffersAtom, run.shopOffers ? offers : null);

  const board = [];
  for (let i = 0; i < run.board.length; i += GRID_SIZE) {
    board.push(run.board.slice(i, i + GRID_SIZE));
  }
  store.set(boardAtom, board);

  return true;
}
