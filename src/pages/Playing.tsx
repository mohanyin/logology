import { useAtom } from "jotai";
import { roundAtom } from "@/atoms/game";
import Game from "@/components/board/Game";

export default function PlayingPage() {
  const [round] = useAtom(roundAtom);

  return (
    <div className="flex flex-1 items-center justify-center overflow-y-auto p-4">
      <Game key={round} />
    </div>
  );
}
