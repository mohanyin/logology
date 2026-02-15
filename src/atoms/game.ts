import { BASE_GOAL_SCORE, SCORE_SCALING_FACTOR } from "@/utils/constants";
import { atom } from "jotai";

export const roundAtom = atom(0);

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
