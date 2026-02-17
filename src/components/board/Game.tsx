import { useState } from "react";
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
  wordsRemainingAtom,
} from "@/atoms/game";
import { scoreWord } from "@/utils/scoring";
import { hasSound } from "@/utils/sounds";
import type { GameContext } from "@/types/powerups";
import { type Tile } from "@/utils/tiles";
import Scoreboard from "@/components/board/Scoreboard";
import Grid from "@/components/board/Grid";

const GRID_SIZE = 4;

export default function Game() {
  const [tiles] = useAtom(tilesAtom);
  const [board, setBoard] = useState<(Tile | null)[][]>(
    Array.from({ length: GRID_SIZE }, (_, i) =>
      Array.from({ length: GRID_SIZE }, (_, j) => tiles[4 * i + j]),
    ),
  );
  const [nextTile, setNextTile] = useState(GRID_SIZE * GRID_SIZE);

  const [score, setScore] = useAtom(scoreAtom);
  const [goal] = useAtom(goalAtom);
  const [selected, setSelected] = useState<[number, number][]>([]);
  const { ready, isValidWord, lookupWord } = useDictionary();

  const [powerups] = useAtom(powerupsAtom);
  const [playedWords, setPlayedWords] = useAtom(playedWordsAtom);
  const [, setGold] = useAtom(goldAtom);
  const navigate = useNavigate();

  const selectedWord = selected.map(([i, j]) => board[i][j]?.letter).join("");
  const isValid = selectedWord.length >= 2 && isValidWord(selectedWord);

  const selectedTiles = selected.map(([i, j]) => board[i][j]) as Tile[];

  const buildGameContext = (currentMultiplier: number): GameContext => {
    const wordData = lookupWord(selectedWord);
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
  };

  const scoringResult =
    !isValid || selectedTiles.length === 0
      ? { totalScore: 0, basePoints: 0, multiplier: 0 }
      : scoreWord(selectedTiles, powerups, buildGameContext(1));

  const [wordsRemaining, setWordsRemaining] = useAtom(wordsRemainingAtom);

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
    setNextTile((prev) => prev + selected.length);
    setSelected([]);

    setWordsRemaining((prev) => prev - 1);

    if (newScore >= goal) {
      setGold((prev) => prev + GOLD_PER_CHALLENGE);
      navigate({ to: "/shop" });
    }
  };

  return (
    <div className="text-neutral-white flex flex-col items-center gap-6">
      <Scoreboard
        basePoints={scoringResult.basePoints}
        multiplier={scoringResult.multiplier}
        totalScore={scoringResult.totalScore}
        selectedWord={selectedWord}
        isValid={isValid}
        ready={ready}
      />
      <Grid
        board={board}
        selected={selected}
        setSelected={setSelected}
        wordsRemaining={wordsRemaining}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
