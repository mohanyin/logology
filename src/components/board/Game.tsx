import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { GOLD_PER_CHALLENGE } from "@/utils/constants";
import { useDictionary } from "@/hooks/useDictionary";
import { useScoreSequencer } from "@/hooks/useScoreSequencer";
import { useAtom } from "jotai";
import {
  boardAtom,
  goalAtom,
  goldAtom,
  nextTileAtom,
  playedWordsAtom,
  powerupsAtom,
  scoreAtom,
  shufflesRemainingAtom,
  tilesAtom,
  wordsRemainingAtom,
} from "@/atoms/game";
import { ZERO_TOTALS, buildScoreSequence, previewWord } from "@/utils/scoring";
import { saveRun } from "@/utils/persistence";
import { hasSound } from "@/utils/sounds";
import type { GameContext } from "@/types/powerups";
import { shuffleTiles, type Tile } from "@/utils/tiles";
import Scoreboard from "@/components/board/Scoreboard";
import Grid from "@/components/board/Grid";

export default function Game() {
  const [tiles] = useAtom(tilesAtom);
  const [board, setBoard] = useAtom(boardAtom);
  const [nextTile, setNextTile] = useAtom(nextTileAtom);

  const [score, setScore] = useAtom(scoreAtom);
  const [goal] = useAtom(goalAtom);
  const [selected, setSelected] = useState<[number, number][]>([]);
  const { ready, isValidWord, lookupWord } = useDictionary();

  const [powerups] = useAtom(powerupsAtom);
  const [playedWords, setPlayedWords] = useAtom(playedWordsAtom);
  const [, setGold] = useAtom(goldAtom);
  const navigate = useNavigate();

  const [wordsRemaining, setWordsRemaining] = useAtom(wordsRemainingAtom);
  const [shufflesRemaining, setShufflesRemaining] = useAtom(
    shufflesRemainingAtom,
  );

  const sequencer = useScoreSequencer();
  const isAnimating = sequencer.isRunning;

  const selectedWord = selected.map(([i, j]) => board[i][j]?.letter).join("");
  const isValid = selectedWord.length >= 2 && isValidWord(selectedWord);

  const selectedTiles = useMemo(
    () => selected.map(([i, j]) => board[i][j]) as Tile[],
    [selected, board],
  );

  // While selecting, the display shows tile contributions only — no powerup
  // hooks run until submit.
  const preview = useMemo(() => previewWord(selectedTiles), [selectedTiles]);
  const totals = isAnimating
    ? (sequencer.displayed ?? ZERO_TOTALS)
    : isValid
      ? preview
      : ZERO_TOTALS;

  // Every round ending routes from here: after a word commits, and on
  // arrival at a board that is already won or already out of words (a
  // browser back out of the shop, say). Clearing the goal wins even on the
  // last word, so it is checked first. Waits for the score animation so the
  // player sees the word that ended the round.
  useEffect(() => {
    if (isAnimating) return;
    if (score >= goal) navigate({ to: "/shop" });
    else if (wordsRemaining <= 0) navigate({ to: "/game-over" });
  }, [isAnimating, score, goal, wordsRemaining, navigate]);

  const handleShuffle = () => {
    if (isAnimating || shufflesRemaining <= 0) return;
    setBoard((prev) => {
      const positions: [number, number][] = [];
      const nonNullTiles: Tile[] = [];
      prev.forEach((row, i) =>
        row.forEach((tile, j) => {
          if (tile !== null) {
            positions.push([i, j]);
            nonNullTiles.push(tile);
          }
        }),
      );
      const shuffled = shuffleTiles(nonNullTiles);
      const next = prev.map((row) => [...row]);
      positions.forEach(([i, j], idx) => {
        next[i][j] = shuffled[idx];
      });
      return next;
    });
    setSelected([]);
    setShufflesRemaining((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (!isValid || isAnimating || selected.length === 0) return;
    if (wordsRemaining <= 0) return;

    // Capture everything the commit needs. The board is locked for the
    // duration, so none of it can change underneath us.
    const word = selectedWord;
    const cells = selected;
    const wordData = lookupWord(word);
    const pos = wordData?.pos ?? [];
    const tags = wordData?.tags ?? [];
    const pronunciations = wordData?.pronunciations ?? [];

    const makeContext = (runningMultiplier: number): GameContext => ({
      currentWord: {
        word,
        length: word.length,
        multiplier: runningMultiplier,
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
    });

    const sequence = buildScoreSequence(selectedTiles, powerups, makeContext);

    const commit = () => {
      const newScore = score + sequence.result.totalScore;
      setScore(newScore);
      setPlayedWords((prev) => [...prev, word]);

      setBoard((prev) => {
        const next = prev.map((row) => [...row]);
        cells.forEach(([i, j], index) => {
          next[i][j] = tiles[nextTile + index] ?? null;
        });
        return next;
      });
      setNextTile((prev) => prev + cells.length);
      setSelected([]);
      setWordsRemaining((prev) => prev - 1);

      // Clearing the goal wins the round even on the last word. Routing is
      // left to the round-end effect below, so both paths agree.
      if (newScore >= goal) setGold((prev) => prev + GOLD_PER_CHALLENGE);

      // Save only once the word has fully landed, so refreshing mid-animation
      // restores the pre-submit board rather than a half-scored word.
      saveRun();
    };

    // Nothing to animate — commit straight away rather than stalling on an
    // empty sequence.
    if (sequence.steps.length === 0) {
      commit();
      return;
    }
    sequencer.start(sequence, commit);
  };

  // Which board cells shake on the current step.
  const shakeCells = useMemo(() => {
    const step = sequencer.activeStep;
    if (!step) return [];
    switch (step.source.kind) {
      case "tile":
      case "letterPowerup": {
        const [i, j] = selected[step.source.tileIndex];
        return [`${i},${j}`];
      }
      case "wordPowerup":
        return selected.map(([i, j]) => `${i},${j}`);
    }
  }, [sequencer.activeStep, selected]);

  const activeSource = sequencer.activeStep?.source;
  const shakingPowerupIndex =
    activeSource && activeSource.kind !== "tile"
      ? activeSource.powerupIndex
      : null;

  return (
    <div className="text-neutral-white flex flex-col items-center gap-6">
      <Scoreboard
        basePoints={totals.basePoints}
        multiplier={totals.multiplier}
        totalScore={totals.totalScore}
        selectedWord={selectedWord}
        isValid={isValid}
        ready={ready}
        shakingPowerupIndex={shakingPowerupIndex}
        shakeId={sequencer.shakeId}
      />
      <Grid
        board={board}
        selected={selected}
        setSelected={setSelected}
        wordsRemaining={wordsRemaining}
        onSubmit={handleSubmit}
        shufflesRemaining={shufflesRemaining}
        onShuffle={handleShuffle}
        locked={isAnimating}
        shakeCells={shakeCells}
        shakeId={sequencer.shakeId}
      />
    </div>
  );
}
