import {
  BASE_GOAL_SCORE,
  BASE_ROUND_COUNT,
  SCORE_SCALING_FACTOR,
  STARTING_GOLD,
} from "@/utils/constants";
import { atom, createStore } from "jotai";
import type { Powerup } from "@/types/powerups";
import { createStartingTiles, shuffleTiles } from "@/utils/tiles";
import { router } from "@/router";

export const roundAtom = atom(0);

export const scoreAtom = atom(0);

export const wordsRemainingAtom = atom(BASE_ROUND_COUNT);

export const goldAtom = atom(STARTING_GOLD);

export const tilesAtom = atom(createStartingTiles());

export const startGame = () => {
  const store = createStore();
  store.set(scoreAtom, 0);
  store.set(wordsRemainingAtom, BASE_ROUND_COUNT);
  store.set(tilesAtom, (prev) => shuffleTiles(prev));
  store.set(roundAtom, (prev) => prev + 1);
  store.set(playedWordsAtom, []);
  router.navigate({ to: "/" });
};

export const remainingTilesAtom = atom((get) => {
  const tiles = get(tilesAtom);
  return tiles.length;
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
