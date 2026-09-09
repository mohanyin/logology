import { useMemo, useState } from "react";
import { useAtom } from "jotai";
import { remainingTileListAtom } from "@/atoms/game";
import Tile from "@/components/board/Tile";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

type SortMode = "letter" | "points";

interface TilesModalProps {
  onClose: () => void;
}

export default function TilesModal({ onClose }: TilesModalProps) {
  const [remaining] = useAtom(remainingTileListAtom);
  const [sort, setSort] = useState<SortMode>("letter");

  // Never render the bag in draw order — that would give away exactly which
  // tiles are coming next.
  const tiles = useMemo(() => {
    const sorted = [...remaining];
    sorted.sort((a, b) =>
      sort === "letter"
        ? a.letter.localeCompare(b.letter) || b.points - a.points
        : b.points - a.points || a.letter.localeCompare(b.letter),
    );
    return sorted;
  }, [remaining, sort]);

  return (
    <Modal
      label="Tiles left in the bag"
      onClose={onClose}
      className="max-w-sm border-blue-400"
    >
      <div className="flex flex-col items-center gap-1">
        <span className="font-family-display text-neutral-white text-2xl">
          {remaining.length} tiles left
        </span>
        <div className="flex gap-1" role="group" aria-label="Sort tiles">
          {(
            [
              ["letter", "A–Z"],
              ["points", "Points"],
            ] as const
          ).map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              onClick={() => setSort(mode)}
              aria-pressed={sort === mode}
              className={`cursor-pointer rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase transition-colors ${
                sort === mode
                  ? "bg-blue-medium text-neutral-white"
                  : "bg-neutral-black text-neutral-dark border-neutral-x-dark/40 border"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {remaining.length === 0 ? (
        <p className="text-neutral-dark py-6 text-sm">The bag is empty.</p>
      ) : (
        <div className="min-h-0 w-full overflow-y-auto">
          <div className="grid grid-cols-4 justify-items-center gap-2">
            {tiles.map((tile, i) => (
              <div key={i} className="aspect-60/62 w-14">
                <Tile letter={tile.letter} points={tile.points} />
              </div>
            ))}
          </div>
        </div>
      )}

      <Button color="blue" onClick={onClose}>
        Close
      </Button>
    </Modal>
  );
}
