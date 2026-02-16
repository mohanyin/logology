import {
  BASE_GOAL_SCORE,
  SCORE_SCALING_FACTOR,
  STARTING_GOLD,
} from "@/utils/constants";
import { atom } from "jotai";
import type { Powerup } from "@/types/powerups";
import createMe from "@/powerups/me";

export const roundAtom = atom(0);

export const scoreAtom = atom(0);

export const goldAtom = atom(STARTING_GOLD);

/** Active powerups for the current game. Hardcoded for now. */
export const powerupsAtom = atom<Powerup[]>([createMe()]);

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
