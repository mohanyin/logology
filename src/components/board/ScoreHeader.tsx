import { useAtom } from "jotai";
import {
  goalAtom,
  goldAtom,
  remainingTilesAtom,
  scoreAtom,
} from "@/atoms/game";

export default function ScoreHeader() {
  const [score] = useAtom(scoreAtom);
  const [goal] = useAtom(goalAtom);
  const [gold] = useAtom(goldAtom);
  const [tilesRemaining] = useAtom(remainingTilesAtom);

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <div className="font-family-display flex items-baseline gap-2 text-2xl font-bold">
        <span className="text-neutral-black">Score: {score}</span>
        <span className="text-neutral-x-dark">/</span>
        <span className="text-neutral-black">Goal: {goal}</span>
      </div>

      <div className="font-family-display flex items-center gap-2 text-xl font-bold">
        <span
          className="flex items-center gap-1.5 rounded-sm border border-orange-400 bg-orange-200 px-2 py-1 text-orange-600"
          aria-label={`${gold} gold`}
        >
          <span aria-hidden="true" className="text-base leading-none">
            &#9679;
          </span>
          {gold}
        </span>

        <span
          className="flex items-center gap-1.5 rounded-sm border border-blue-400 bg-blue-200 px-2 py-1 text-blue-600"
          aria-label={`${tilesRemaining} tiles left in the bag`}
        >
          <span aria-hidden="true" className="text-base leading-none">
            &#9642;
          </span>
          {tilesRemaining}
        </span>
      </div>
    </div>
  );
}
