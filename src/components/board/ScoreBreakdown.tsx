interface ScoreBreakdownProps {
  basePoints: number;
  multiplier: number;
  totalScore: number;
}

export default function ScoreBreakdown({
  basePoints,
  multiplier,
  totalScore,
}: ScoreBreakdownProps) {
  return (
    <>
      <div className="font-family-display flex w-full items-center justify-stretch gap-2">
        <div className="bg-orange-dark text-orange-light flex-1 rounded-sm p-2 text-right text-2xl font-bold">
          {basePoints}
        </div>
        <div className="text-neutral-x-dark">x</div>
        <div className="bg-green-dark text-green-light flex-1 rounded-sm p-2 text-right text-2xl font-bold">
          {multiplier}
        </div>
      </div>
      <div className="font-family-display bg-neutral-black w-full rounded-sm p-2 text-right text-2xl font-bold">
        {totalScore}
      </div>
    </>
  );
}
