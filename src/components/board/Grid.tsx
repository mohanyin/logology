import { useCallback, useRef } from "react";
import { type Tile as TileType } from "@/utils/tiles";
import Button from "@/components/ui/Button";
import GridCell from "@/components/board/GridCell";

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
  board: (TileType | null)[][];
  selected: [number, number][];
  setSelected: React.Dispatch<React.SetStateAction<[number, number][]>>;
  wordsRemaining: number;
  onSubmit: () => void;
  shufflesRemaining: number;
  onShuffle: () => void;
  /** True while a score animation is playing; blocks all board input. */
  locked: boolean;
  /** Board coords ("row,col") shaking on the current step. */
  shakeCells: string[];
  shakeId: string;
}

export default function Grid({
  board,
  selected,
  setSelected,
  wordsRemaining,
  onSubmit,
  shufflesRemaining,
  onShuffle,
  locked,
  shakeCells,
  shakeId,
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

        // Re-touching a selected tile truncates back to it, so tapping the
        // "E" in "SWEAR" leaves "SWE". Touching the tip drops it instead,
        // since truncating there would be a no-op.
        const prevIndex = prev.findIndex(([pi, pj]) => pi === i && pj === j);
        if (prevIndex !== -1) {
          const isTip = prevIndex === prev.length - 1;
          return prev.slice(0, isTip ? prevIndex : prevIndex + 1);
        }

        // Reaching a non-adjacent tile breaks the chain: with a single tile
        // selected there is no word to protect, so restart there instead.
        const last = prev[prev.length - 1];
        if (!isNeighbor(last, tileCoords)) {
          return prev.length === 1 ? [tileCoords] : prev;
        }

        return [...prev, [i, j]];
      });
    },
    [board, setSelected],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (locked) return;

      isDragging.current = true;
      hasDragged.current = false;

      const coords = tileFromPoint(e.clientX, e.clientY);
      if (!coords) return;

      startTile.current = coords;
      lastTile.current = coords.toString();
    },
    [locked],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (locked || !isDragging.current) return;

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
    [locked, selectTile, setSelected],
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
        className="grid touch-none grid-cols-4 gap-4 rounded-lg p-2"
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
                  className="aspect-60/62 w-16 rounded-[4px] bg-[#1d1f35]/25"
                />
              );
            }

            const isSelected = selected.some(
              ([selectedI, selectedJ]) => i === selectedI && j === selectedJ,
            );

            return (
              <GridCell
                key={`${i}-${j}`}
                tile={tile}
                row={i}
                col={j}
                selected={isSelected}
                shaking={shakeCells.includes(`${i},${j}`)}
                shakeId={shakeId}
              />
            );
          });
        })}
      </div>

      <div className="flex gap-2">
        {selected.length > 0 ? (
          <Button
            key="clear"
            color="blue"
            onClick={() => setSelected([])}
            disabled={locked}
          >
            Clear
          </Button>
        ) : (
          <Button
            key="shuffle"
            color="orange"
            count={shufflesRemaining}
            onClick={onShuffle}
            disabled={locked || shufflesRemaining <= 0}
          >
            Shuffle
          </Button>
        )}
        <Button
          color="green"
          count={wordsRemaining}
          onClick={onSubmit}
          disabled={locked}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
