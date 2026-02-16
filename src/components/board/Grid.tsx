import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { GOLD_PER_CHALLENGE, STARTING_TILES } from "@/utils/constants";
import { useDictionary } from "@/hooks/useDictionary";
import { useAtom } from "jotai";
import {
  goalAtom,
  goldAtom,
  playedWordsAtom,
  powerupsAtom,
  scoreAtom,
} from "@/atoms/game";
import { scoreWord } from "@/utils/scoring";
import { hasSound } from "@/utils/sounds";
import type { GameContext } from "@/types/powerups";

const GRID_SIZE = 4;

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
  const [score, setScore] = useAtom(scoreAtom);
  const [{ tiles, pool }] = useState(initGrid);
  const [gridTiles, setGridTiles] = useState<(string | null)[]>(tiles);
  const poolRef = useRef(pool);
  const [selected, setSelected] = useState<number[]>([]);
  const isDragging = useRef(false);
  const { ready, isValidWord, lookupWord } = useDictionary();

  const [goal] = useAtom(goalAtom);
  const [powerups] = useAtom(powerupsAtom);
  const [playedWords, setPlayedWords] = useAtom(playedWordsAtom);
  const [, setGold] = useAtom(goldAtom);
  const navigate = useNavigate();

  const selectedWord = selected.map((i) => gridTiles[i]).join("");
  const isValid = selectedWord.length >= 2 && isValidWord(selectedWord);

  const selectedTiles = useMemo(() => {
    return selected.map((i) => {
      const letter = gridTiles[i]!;
      return {
        letter,
        points: STARTING_TILES[letter as keyof typeof STARTING_TILES].points,
      };
    });
  }, [selected, gridTiles]);

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

    const newScore = score + scoringResult.totalScore;
    setScore(newScore);
    setPlayedWords((prev) => [...prev, selectedWord]);

    const replacements = drawFromPool(poolRef.current, selected.length);

    setGridTiles((prev) => {
      const next = [...prev];
      selected.forEach((gridIndex, i) => {
        next[gridIndex] = i < replacements.length ? replacements[i] : null;
      });
      return next;
    });

    setSelected([]);

    if (newScore >= goal) {
      setGold((prev) => prev + GOLD_PER_CHALLENGE);
      navigate({ to: "/shop" });
    }
  }, [
    isValid,
    score,
    scoringResult.totalScore,
    selectedWord,
    selected,
    goal,
    setScore,
    setPlayedWords,
    setGold,
    navigate,
  ]);

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
        {gridTiles.map((letter, i) => {
          if (letter === null) {
            return (
              <div
                key={i}
                className="bg-blue-medium flex size-16 items-center justify-center rounded-lg"
              />
            );
          }

          const { points } =
            STARTING_TILES[letter as keyof typeof STARTING_TILES];
          const isSelected = selected.includes(i);

          return (
            <div
              key={i}
              onPointerDown={() => handlePointerDown(i)}
              onPointerEnter={() => handlePointerEnter(i)}
              className={`bg-blue-medium text-neutral-white relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg text-2xl font-bold transition-colors select-none ${
                isSelected
                  ? "ring-blue-dark ring-2 ring-offset-2"
                  : "hover:bg-blue-dark"
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
