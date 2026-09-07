import { useShake } from "@/hooks/useShake";
import type { Powerup, Rarity } from "@/types/powerups";

const rarityColors: Record<Rarity, { bg: string; border: string }> = {
  common: { bg: "bg-neutral-black/60", border: "border-neutral-x-dark/40" },
  uncommon: { bg: "bg-green-dark/60", border: "border-green-medium/40" },
  rare: { bg: "bg-blue-dark/60", border: "border-blue-medium/40" },
  legendary: { bg: "bg-orange-dark/60", border: "border-orange-medium/40" },
};

interface PowerupIconProps {
  powerup: Powerup;
  shaking: boolean;
  shakeId: string;
}

export default function PowerupIcon({
  powerup,
  shaking,
  shakeId,
}: PowerupIconProps) {
  const ref = useShake<HTMLDivElement>(shaking, shakeId);
  const colors = rarityColors[powerup.rarity];

  return (
    <div
      ref={ref}
      title={`${powerup.name} — ${powerup.description}`}
      className={`flex size-12 shrink-0 items-center justify-center rounded-lg border ${colors.border} ${colors.bg} backdrop-blur-sm`}
    >
      <img
        src={powerup.imagePath}
        alt={powerup.name}
        className="size-10 rounded-md object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}
