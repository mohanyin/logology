import { useAtom } from "jotai";
import { goalAtom, scoreAtom } from "@/atoms/game";

interface ScoreboardProps {
  basePoints: number;
  multiplier: number;
  totalScore: number;
  selectedWord: string;
  isValid: boolean;
  ready: boolean;
}

export default function Scoreboard({
  basePoints,
  multiplier,
  totalScore,
  selectedWord,
  isValid,
  ready,
}: ScoreboardProps) {
  const [score] = useAtom(scoreAtom);
  const [goal] = useAtom(goalAtom);

  return (
    <>
      <div className="flex w-full gap-2">
        <div className="text-neutral-black font-family-display text-2xl font-bold">
          Score: {score}
        </div>
        <div className="text-neutral-x-dark"> / </div>
        <div className="text-neutral-black font-family-display text-2xl font-bold">
          Goal:{goal}
        </div>
      </div>
      <div className="font-family-display flex w-full items-center justify-stretch gap-2">
        <div className="bg-orange-dark text-orange-light flex-1 rounded-sm p-2 text-right text-2xl font-bold">
          {basePoints}
        </div>
        <div className="text-neutral-x-dark">x</div>
        <div className="bg-green-dark text-green-light flex-1 rounded-sm p-2 text-right text-2xl font-bold">
          {multiplier}
        </div>
      </div>
      <div className="font-family-display bg-neutral-black w-full rounded-sm p-2 text-right text-2xl font-bold">
        {totalScore}
      </div>
      <div
        className={`flex min-h-12 min-w-48 items-center justify-center rounded-lg px-6 py-2 text-center text-2xl font-bold tracking-widest transition-colors ${
          isValid ? "bg-green-medium" : "bg-neutral-dark"
        }`}
        aria-live="polite"
      >
        {!ready ? (
          <span className="text-sm font-normal text-zinc-600">
            Loading dictionary…
          </span>
        ) : (
          selectedWord || "\u00A0"
        )}
      </div>
    </>
  );
}
