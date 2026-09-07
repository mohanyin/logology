import ScoreHeader from "@/components/board/ScoreHeader";
import ScoreBreakdown from "@/components/board/ScoreBreakdown";
import WordDisplay from "@/components/board/WordDisplay";
import PowerupsRow from "@/components/powerups/PowerupsRow";

interface ScoreboardProps {
  basePoints: number;
  multiplier: number;
  totalScore: number;
  selectedWord: string;
  isValid: boolean;
  ready: boolean;
  shakingPowerupIndex: number | null;
  shakeId: string;
}

export default function Scoreboard({
  basePoints,
  multiplier,
  totalScore,
  selectedWord,
  isValid,
  ready,
  shakingPowerupIndex,
  shakeId,
}: ScoreboardProps) {
  return (
    <>
      <ScoreHeader />
      <PowerupsRow
        shakingPowerupIndex={shakingPowerupIndex}
        shakeId={shakeId}
      />
      <ScoreBreakdown
        basePoints={basePoints}
        multiplier={multiplier}
        totalScore={totalScore}
      />
      <WordDisplay
        selectedWord={selectedWord}
        isValid={isValid}
        ready={ready}
      />
    </>
  );
}
