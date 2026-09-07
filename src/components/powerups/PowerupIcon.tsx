import { useShake } from "@/hooks/useShake";
import type { Powerup } from "@/types/powerups";
import { rarityColors } from "@/utils/rarity";

interface PowerupIconProps {
  powerup: Powerup;
  shaking: boolean;
  shakeId: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function PowerupIcon({
  powerup,
  shaking,
  shakeId,
  onClick,
  disabled = false,
}: PowerupIconProps) {
  const ref = useShake<HTMLButtonElement>(shaking, shakeId);
  const colors = rarityColors[powerup.rarity];

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${powerup.name} — ${powerup.description}`}
      title={`${powerup.name} — ${powerup.description}`}
      className={`flex size-12 shrink-0 items-center justify-center rounded-lg border ${colors.border} ${colors.bg} backdrop-blur-sm enabled:cursor-pointer`}
    >
      <img
        src={powerup.imagePath}
        alt={powerup.name}
        className="size-10 rounded-md object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </button>
  );
}
