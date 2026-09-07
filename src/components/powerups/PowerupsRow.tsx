import { useState } from "react";
import { useAtom } from "jotai";
import { goldAtom, powerupsAtom } from "@/atoms/game";
import PowerupIcon from "@/components/powerups/PowerupIcon";
import PowerupModal from "@/components/powerups/PowerupModal";
import { sellValue } from "@/utils/powerups";
import { saveRun } from "@/utils/persistence";

interface PowerupsRowProps {
  /** Only the board animates powerups; elsewhere the row is static. */
  shakingPowerupIndex?: number | null;
  shakeId?: string;
  /** Blocks opening the modal while a score is animating, since the running
   *  sequence addresses powerups by their index in this array. */
  disabled?: boolean;
}

export default function PowerupsRow({
  shakingPowerupIndex = null,
  shakeId = "",
  disabled = false,
}: PowerupsRowProps) {
  const [powerups, setPowerups] = useAtom(powerupsAtom);
  const [, setGold] = useAtom(goldAtom);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (powerups.length === 0) return null;

  const open = openIndex === null ? null : powerups[openIndex];

  const handleSell = () => {
    if (openIndex === null) return;
    const powerup = powerups[openIndex];
    setGold((prev) => prev + sellValue(powerup));
    setPowerups((prev) => prev.filter((_, i) => i !== openIndex));
    setOpenIndex(null);
    saveRun();
  };

  return (
    <>
      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        {powerups.map((powerup, i) => (
          <PowerupIcon
            key={`${powerup.name}-${i}`}
            powerup={powerup}
            shaking={shakingPowerupIndex === i}
            shakeId={shakeId}
            disabled={disabled}
            onClick={() => setOpenIndex(i)}
          />
        ))}
      </div>

      {open && (
        <PowerupModal
          powerup={open}
          onSell={handleSell}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
