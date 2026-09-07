import { useAtom } from "jotai";
import {
  goalAtom,
  playedWordsAtom,
  restartRun,
  roundAtom,
  scoreAtom,
} from "@/atoms/game";
import { saveRun } from "@/utils/persistence";

export default function GameOver() {
  const [round] = useAtom(roundAtom);
  const [score] = useAtom(scoreAtom);
  const [goal] = useAtom(goalAtom);
  const [playedWords] = useAtom(playedWordsAtom);

  return (
    <div className="flex h-full w-full flex-col items-center gap-6 px-4 py-8">
      <h1 className="font-family-display text-neutral-black text-3xl">
        Out of words
      </h1>

      <p className="text-neutral-x-dark text-center">
        You needed {goal} and finished on {score}.
      </p>

      <div className="flex w-full max-w-xs flex-col gap-2">
        <div className="border-neutral-dark flex items-center justify-between border-b py-2">
          <span className="text-neutral-x-dark text-sm">Round reached</span>
          <span className="font-family-display text-neutral-black text-2xl">
            {round + 1}
          </span>
        </div>
        <div className="border-neutral-dark flex items-center justify-between border-b py-2">
          <span className="text-neutral-x-dark text-sm">Final score</span>
          <span className="font-family-display text-neutral-black text-2xl">
            {score}
          </span>
        </div>
        <div className="border-neutral-dark flex items-center justify-between border-b py-2">
          <span className="text-neutral-x-dark text-sm">Words played</span>
          <span className="font-family-display text-neutral-black text-2xl">
            {playedWords.length}
          </span>
        </div>
      </div>

      {playedWords.length > 0 && (
        <p className="text-neutral-x-dark max-w-xs text-center text-sm tracking-wider uppercase">
          {playedWords.join(" · ")}
        </p>
      )}

      <button
        onClick={() => {
          restartRun();
          saveRun();
        }}
        className="bg-green-medium hover:bg-green-dark mt-4 rounded-lg px-8 py-3 text-lg font-bold text-white transition-colors"
      >
        Play again
      </button>
    </div>
  );
}
