import { useCallback, useMemo, useRef, useState } from "react";
import { STARTING_TILES } from "@/utils/constants";
import { useDictionary } from "@/hooks/useDictionary";
import { useAtom } from "jotai";
import { goalAtom } from "@/atoms/game";

const GRID_SIZE = 5;

function buildTilePool(): string[] {
  const pool: string[] = [];
  for (const [letter, { count }] of Object.entries(STARTING_TILES)) {
    for (let i = 0; i < count; i++) {
      pool.push(letter);
    }
  }
  return pool;
}

function drawFromPool(pool: string[], count: number): string[] {
  const drawn: string[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    drawn.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return drawn;
}

function toRowCol(index: number) {
  return { row: Math.floor(index / GRID_SIZE), col: index % GRID_SIZE };
}

function isNeighbor(a: number, b: number): boolean {
  const posA = toRowCol(a);
  const posB = toRowCol(b);
  const dRow = Math.abs(posA.row - posB.row);
  const dCol = Math.abs(posA.col - posB.col);
  return dRow <= 1 && dCol <= 1 && !(dRow === 0 && dCol === 0);
}

function initGrid() {
  const pool = buildTilePool();
  const tiles = drawFromPool(pool, GRID_SIZE * GRID_SIZE);
  return { tiles, pool };
}

export default function Grid() {
  const [score, setScore] = useState(0);
  const [{ tiles, pool }] = useState(initGrid);
  const [gridTiles, setGridTiles] = useState<(string | null)[]>(tiles);
  const poolRef = useRef(pool);
  const [selected, setSelected] = useState<number[]>([]);
  const isDragging = useRef(false);
  const { ready, isValidWord } = useDictionary();

  const [goal] = useAtom(goalAtom);

  const selectedWord = selected.map((i) => gridTiles[i]).join("");
  const isValid = selectedWord.length >= 2 && isValidWord(selectedWord);

  const letterScore = useMemo(() => {
    return selectedWord.split("").reduce((acc, letter) => {
      return acc + STARTING_TILES[letter as keyof typeof STARTING_TILES].points;
    }, 0);
  }, [selectedWord]);

  const selectTile = useCallback(
    (index: number) => {
      setSelected((prev) => {
        if (gridTiles[index] === null) return prev;

        const prevIndex = prev.indexOf(index);
        if (prevIndex !== -1) {
          if (prevIndex === prev.length - 2) {
            return prev.slice(0, -1);
          }
          return prev;
        }

        if (prev.length === 0) return [index];

        const last = prev[prev.length - 1];
        if (!isNeighbor(last, index)) return prev;

        return [...prev, index];
      });
    },
    [gridTiles],
  );

  const handlePointerDown = useCallback(
    (index: number) => {
      isDragging.current = true;
      setSelected([]);
      selectTile(index);
    },
    [selectTile],
  );

  const handlePointerEnter = useCallback(
    (index: number) => {
      if (!isDragging.current) return;
      selectTile(index);
    },
    [selectTile],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleSubmit = useCallback(() => {
    if (!isValid) return;

    setScore((prev) => prev + selectedWord.length * letterScore);

    const replacements = drawFromPool(poolRef.current, selected.length);

    setGridTiles((prev) => {
      const next = [...prev];
      selected.forEach((gridIndex, i) => {
        next[gridIndex] = i < replacements.length ? replacements[i] : null;
      });
      return next;
    });

    setSelected([]);
  }, [isValid, selectedWord, letterScore, selected]);

  return (
    <div className="flex flex-col items-center gap-6 text-white">
      <div className="text-2xl font-bold">
        {score} / {goal}
      </div>
      <div className="text-2xl font-bold">{`${selectedWord.length} x ${letterScore}`}</div>
      <div className="text-2xl font-bold">
        {selectedWord.length * letterScore}
      </div>
      <div
        className={`flex min-h-12 min-w-48 items-center justify-center rounded-lg px-6 py-2 text-center text-2xl font-bold tracking-widest transition-colors ${
          selectedWord.length === 0
            ? "bg-blue-medium text-white"
            : isValid
              ? "bg-green-medium text-white"
              : "bg-blue-medium text-white"
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

      <div
        className="grid touch-none grid-cols-5 gap-4"
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {gridTiles.map((letter, i) => {
          if (letter === null) {
            return (
              <div
                key={i}
                className="flex h-16 w-16 items-center justify-center rounded-lg bg-zinc-900/50"
              />
            );
          }

          const { points } =
            STARTING_TILES[letter as keyof typeof STARTING_TILES];
          const isSelected = selected.includes(i);
          const selectionIndex = selected.indexOf(i);
          const isLast = isSelected && selectionIndex === selected.length - 1;

          return (
            <div
              key={i}
              onPointerDown={() => handlePointerDown(i)}
              onPointerEnter={() => handlePointerEnter(i)}
              className={`relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg text-2xl font-bold transition-colors select-none ${
                isLast
                  ? "bg-indigo-500 text-white ring-2 ring-indigo-300"
                  : isSelected
                    ? "bg-indigo-600/70 text-white"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              <span>{letter}</span>
              <span className="absolute bottom-1 text-[10px] font-normal text-zinc-400">
                {points}
              </span>
            </div>
          );
        })}
      </div>

      <button
        className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <button onClick={() => setSelected([])}>Clear</button>
    </div>
  );
}
