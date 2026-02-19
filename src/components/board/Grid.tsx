import { useCallback, useRef } from "react";
import { type Tile } from "@/utils/tiles";

function isNeighbor(a: [number, number], b: [number, number]): boolean {
  const dRow = Math.abs(a[0] - b[0]);
  const dCol = Math.abs(a[1] - b[1]);
  return dRow <= 1 && dCol <= 1 && !(dRow === 0 && dCol === 0);
}

function tileFromPoint(x: number, y: number): [number, number] | null {
  const el = document.elementFromPoint(x, y);
  if (!el) return null;
  const tileEl = (el as HTMLElement).closest<HTMLElement>("[data-tile]");
  if (!tileEl?.dataset.tile) return null;
  const [i, j] = tileEl.dataset.tile.split(",").map(Number);
  return [i, j];
}

interface GridProps {
  board: (Tile | null)[][];
  selected: [number, number][];
  setSelected: React.Dispatch<React.SetStateAction<[number, number][]>>;
  wordsRemaining: number;
  onSubmit: () => void;
  shufflesRemaining: number;
  onShuffle: () => void;
}

export default function Grid({
  board,
  selected,
  setSelected,
  wordsRemaining,
  onSubmit,
  shufflesRemaining,
  onShuffle,
}: GridProps) {
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startTile = useRef<[number, number] | null>(null);
  const lastTile = useRef<string | null>(null);

  const selectTile = useCallback(
    (tileCoords: [number, number]) => {
      setSelected((prev) => {
        const [i, j] = tileCoords;

        if (board[i][j] === null) return prev;

        if (prev.length === 0) return [tileCoords];

        const prevIndex = prev.findIndex(([pi, pj]) => pi === i && pj === j);
        if (prevIndex !== -1) {
          if (prevIndex === prev.length - 2) {
            return prev.slice(0, -1);
          }
          return prev;
        }

        const last = prev[prev.length - 1];
        if (!isNeighbor(last, tileCoords)) return prev;

        return [...prev, [i, j]];
      });
    },
    [board, setSelected],
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;

    const coords = tileFromPoint(e.clientX, e.clientY);
    if (!coords) return;

    startTile.current = coords;
    lastTile.current = coords.toString();
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;

      const coords = tileFromPoint(e.clientX, e.clientY);
      if (!coords) return;

      const key = coords.toString();
      if (key === lastTile.current) return;

      if (!hasDragged.current) {
        hasDragged.current = true;
        setSelected(startTile.current ? [startTile.current] : []);
      }

      lastTile.current = key;
      selectTile(coords);
    },
    [selectTile, setSelected],
  );

  const handlePointerUp = useCallback(() => {
    if (!hasDragged.current && startTile.current) {
      selectTile(startTile.current);
    }

    isDragging.current = false;
    hasDragged.current = false;
    startTile.current = null;
    lastTile.current = null;
  }, [selectTile]);

  return (
    <>
      <div
        className="bg-neutral-dark grid touch-none grid-cols-4 gap-4 rounded-lg p-2"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {board.map((row, i) => {
          return row.map((tile, j) => {
            if (tile === null) {
              return (
                <div
                  key={`${i}-${j}`}
                  className="bg-blue-medium flex size-16 items-center justify-center rounded-lg"
                >
                  {i}
                  {j}
                </div>
              );
            }

            const isSelected = selected.some(
              ([selectedI, selectedJ]) => i === selectedI && j === selectedJ,
            );

            return (
              <div
                key={`${i}-${j}`}
                data-tile={`${i},${j}`}
                className={`bg-blue-medium text-neutral-white relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg text-2xl font-bold transition-colors select-none ${
                  isSelected
                    ? "ring-blue-dark ring-2 ring-offset-2"
                    : "hover:bg-blue-dark"
                }`}
              >
                <span>{tile.letter}</span>
                <span className="absolute bottom-1 text-[10px] font-normal text-zinc-400">
                  {tile.points}
                </span>
              </div>
            );
          });
        })}
      </div>

      <button
        className="bg-green-dark text-green-light block w-full rounded-lg px-4 py-2 font-bold uppercase"
        onClick={onSubmit}
      >
        Submit ({wordsRemaining} left)
      </button>
      <button
        className="bg-orange-dark text-orange-light block w-full rounded-lg px-4 py-2 font-bold uppercase disabled:opacity-50"
        onClick={onShuffle}
        disabled={shufflesRemaining <= 0}
      >
        Shuffle ({shufflesRemaining} left)
      </button>
      <button className="text-neutral-black" onClick={() => setSelected([])}>
        Clear
      </button>
    </>
  );
}
