import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { GOLD_PER_CHALLENGE } from "@/utils/constants";
import { useDictionary } from "@/hooks/useDictionary";
import { useAtom } from "jotai";
import {
  goalAtom,
  goldAtom,
  playedWordsAtom,
  powerupsAtom,
  scoreAtom,
  tilesAtom,
} from "@/atoms/game";
import { scoreWord } from "@/utils/scoring";
import { hasSound } from "@/utils/sounds";
import type { GameContext } from "@/types/powerups";
import { type Tile } from "@/utils/tiles";

const GRID_SIZE = 4;

function isNeighbor(a: [number, number], b: [number, number]): boolean {
  const dRow = Math.abs(a[0] - b[0]);
  const dCol = Math.abs(a[1] - b[1]);
  return dRow <= 1 && dCol <= 1 && !(dRow === 0 && dCol === 0);
}

export default function Grid() {
  const [tiles] = useAtom(tilesAtom);
  const [board, setBoard] = useState<(Tile | null)[][]>(
    Array.from({ length: GRID_SIZE }, (_, i) =>
      Array.from({ length: GRID_SIZE }, (_, j) => tiles[4 * i + j]),
    ),
  );
  const [nextTile, setNextTile] = useState(GRID_SIZE * GRID_SIZE);

  const [score, setScore] = useAtom(scoreAtom);
  const [selected, setSelected] = useState<[number, number][]>([]);
  const isDragging = useRef(false);
  const { ready, isValidWord, lookupWord } = useDictionary();

  const [goal] = useAtom(goalAtom);
  const [powerups] = useAtom(powerupsAtom);
  const [playedWords, setPlayedWords] = useAtom(playedWordsAtom);
  const [, setGold] = useAtom(goldAtom);
  const navigate = useNavigate();

  const selectedWord = selected.map(([i, j]) => board[i][j]?.letter).join("");
  const isValid = selectedWord.length >= 2 && isValidWord(selectedWord);

  const selectedTiles = useMemo(() => {
    return selected.map(([i, j]) => board[i][j]) as Tile[];
  }, [selected, board]);

  const wordData = useMemo(() => {
    if (!isValid) return null;
    return lookupWord(selectedWord);
  }, [isValid, selectedWord, lookupWord]);

  const buildGameContext = useCallback(
    (currentMultiplier: number): GameContext => {
      const pos = wordData?.pos ?? [];
      const tags = wordData?.tags ?? [];
      const pronunciations = wordData?.pronunciations ?? [];

      return {
        currentWord: {
          word: selectedWord,
          length: selectedWord.length,
          multiplier: currentMultiplier,
          isNoun: pos.includes("noun"),
          isVerb: pos.includes("verb"),
          isAdjective: pos.includes("adj"),
          isAdverb: pos.includes("adv"),
          isPastTense: tags.includes("past"),
          isGerund: tags.includes("gerund"),
          partsOfSpeech: pos,
          hasSound: (sound: string) => hasSound(pronunciations, sound),
        },
        playedWords,
        character: { gold: 0, powerups },
        isValidWord,
      };
    },
    [selectedWord, wordData, playedWords, powerups, isValidWord],
  );

  const scoringResult = useMemo(() => {
    if (!isValid || selectedTiles.length === 0) {
      return { totalScore: 0, basePoints: 0, multiplier: 0 };
    }
    const ctx = buildGameContext(1);
    return scoreWord(selectedTiles, powerups, ctx);
  }, [isValid, selectedTiles, powerups, buildGameContext]);

  const selectTile = useCallback(
    (tileCoords: [number, number]) => {
      setSelected((prev) => {
        const [i, j] = tileCoords;

        if (board[i][j] === null) return prev;

        if (prev.length === 0) return [tileCoords];

        const prevIndex = prev.indexOf(tileCoords);
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
    [board],
  );

  const handlePointerDown = useCallback(
    (tileCoords: [number, number]) => {
      isDragging.current = true;
      setSelected([]);
      selectTile(tileCoords);
    },
    [selectTile],
  );

  const handlePointerEnter = useCallback(
    (tileCoords: [number, number]) => {
      if (!isDragging.current) return;
      selectTile(tileCoords);
    },
    [selectTile],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleSubmit = () => {
    if (!isValid) return;

    const newScore = score + scoringResult.totalScore;
    setScore(newScore);
    setPlayedWords((prev) => [...prev, selectedWord]);

    setBoard((board) => {
      const next = board.map((row) => [...row]);
      selected.forEach(([i, j], index) => {
        next[i][j] = tiles[nextTile + index] ?? null;
      });
      return next;
    });
    setNextTile((nextTile) => nextTile + selected.length);
    setSelected([]);

    if (newScore >= goal) {
      setGold((prev) => prev + GOLD_PER_CHALLENGE);
      navigate({ to: "/shop" });
    }
  };

  return (
    <div className="text-neutral-white flex flex-col items-center gap-6">
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
          {scoringResult.basePoints}
        </div>
        <div className="text-neutral-x-dark">x</div>
        <div className="bg-green-dark text-green-light flex-1 rounded-sm p-2 text-right text-2xl font-bold">
          {scoringResult.multiplier}
        </div>
      </div>
      <div className="font-family-display bg-neutral-black w-full rounded-sm p-2 text-right text-2xl font-bold">
        {scoringResult.totalScore}
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

      <div
        className="bg-neutral-dark grid touch-none grid-cols-4 gap-4 rounded-lg p-2"
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
                onPointerDown={() => handlePointerDown([i, j])}
                onPointerEnter={() => handlePointerEnter([i, j])}
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
        onClick={handleSubmit}
      >
        Submit
      </button>
      <button className="text-neutral-black" onClick={() => setSelected([])}>
        Clear
      </button>
    </div>
  );
}
