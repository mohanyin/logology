import {
  BASE_GOAL_SCORE,
  BASE_ROUND_COUNT,
  BOARD_TILE_COUNT,
  GRID_SIZE,
  SCORE_SCALING_FACTOR,
  SHUFFLES_PER_ROUND,
  STARTING_GOLD,
} from "@/utils/constants";
import { atom, getDefaultStore } from "jotai";
import type { Powerup } from "@/types/powerups";
import { createStartingTiles, shuffleTiles, type Tile } from "@/utils/tiles";
import { router } from "@/router";

export const roundAtom = atom(0);

export const scoreAtom = atom(0);

export const wordsRemainingAtom = atom(BASE_ROUND_COUNT);

export const shufflesRemainingAtom = atom(SHUFFLES_PER_ROUND);

export const goldAtom = atom(STARTING_GOLD);

/** Deals the opening board off the top of a freshly shuffled bag. */
export const dealBoard = (tiles: Tile[]): (Tile | null)[][] =>
  Array.from({ length: GRID_SIZE }, (_, i) =>
    Array.from(
      { length: GRID_SIZE },
      (_, j) => tiles[GRID_SIZE * i + j] ?? null,
    ),
  );

const initialTiles = createStartingTiles();

export const tilesAtom = atom(initialTiles);

/** Index of the next tile to be drawn from the bag. */
export const nextTileAtom = atom(BOARD_TILE_COUNT);

/**
 * The tiles currently on the board. Not derivable from the bag: cells are
 * replaced from the draw cursor as words are played, shuffled in place, and
 * left null once the bag runs dry.
 */
export const boardAtom = atom<(Tile | null)[][]>(dealBoard(initialTiles));

/** The powerups this shop visit is offering, so a reload cannot reroll them. */
export const shopOffersAtom = atom<Powerup[] | null>(null);

const resetRound = () => {
  const store = getDefaultStore();
  store.set(scoreAtom, 0);
  store.set(wordsRemainingAtom, BASE_ROUND_COUNT);
  store.set(shufflesRemainingAtom, SHUFFLES_PER_ROUND);
  const tiles = shuffleTiles(store.get(tilesAtom));
  store.set(tilesAtom, tiles);
  store.set(nextTileAtom, BOARD_TILE_COUNT);
  store.set(boardAtom, dealBoard(tiles));
  store.set(playedWordsAtom, []);
  store.set(shopOffersAtom, null);
};

/** Advance to the next round, keeping gold and powerups. */
export const startGame = () => {
  const store = getDefaultStore();
  resetRound();
  store.set(roundAtom, (prev) => prev + 1);
  router.navigate({ to: "/" });
};

/** Start a whole new run from round one, dropping gold and powerups. */
export const restartRun = () => {
  const store = getDefaultStore();
  resetRound();
  store.set(roundAtom, 0);
  store.set(goldAtom, STARTING_GOLD);
  store.set(powerupsAtom, []);
  const tiles = createStartingTiles();
  store.set(tilesAtom, tiles);
  store.set(boardAtom, dealBoard(tiles));
  router.navigate({ to: "/" });
};

/** Tiles still undrawn in the bag. */
export const remainingTilesAtom = atom((get) => {
  const tiles = get(tilesAtom);
  const nextTile = get(nextTileAtom);
  return Math.max(0, tiles.length - nextTile);
});

/** Active powerups for the current game. Hardcoded for now. */
export const powerupsAtom = atom<Powerup[]>([]);

/** Words played so far in the current challenge. */
export const playedWordsAtom = atom<string[]>([]);

export const goalAtom = atom((get) => {
  const round = get(roundAtom);
  const rawGoal =
    BASE_GOAL_SCORE *
    Math.pow(SCORE_SCALING_FACTOR, round) *
    Math.sqrt(round + 1);
  const goalDigits = Math.floor(rawGoal).toString().length;
  return (
    Math.floor(rawGoal / Math.pow(10, goalDigits - 2)) *
    Math.pow(10, goalDigits - 2)
  );
});
