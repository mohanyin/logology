import { useAtom } from "jotai";
import { goalAtom, scoreAtom } from "@/atoms/game";

export default function ScoreHeader() {
  const [score] = useAtom(scoreAtom);
  const [goal] = useAtom(goalAtom);

  return (
    <div className="flex w-full gap-2">
      <div className="text-neutral-black font-family-display text-2xl font-bold">
        Score: {score}
      </div>
      <div className="text-neutral-x-dark"> / </div>
      <div className="text-neutral-black font-family-display text-2xl font-bold">
        Goal:{goal}
      </div>
    </div>
  );
}
