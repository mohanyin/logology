import { useAtom } from "jotai";
import { powerupsAtom } from "@/atoms/game";
import PowerupIcon from "@/components/powerups/PowerupIcon";

interface PowerupsRowProps {
  /** Only the board animates powerups; elsewhere the row is static. */
  shakingPowerupIndex?: number | null;
  shakeId?: string;
}

export default function PowerupsRow({
  shakingPowerupIndex = null,
  shakeId = "",
}: PowerupsRowProps) {
  const [powerups] = useAtom(powerupsAtom);

  if (powerups.length === 0) return null;

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      {powerups.map((powerup, i) => (
        <PowerupIcon
          key={`${powerup.name}-${i}`}
          powerup={powerup}
          shaking={shakingPowerupIndex === i}
          shakeId={shakeId}
        />
      ))}
    </div>
  );
}
