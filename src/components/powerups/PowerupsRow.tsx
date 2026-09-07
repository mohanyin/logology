import { useAtom } from "jotai";
import { powerupsAtom } from "@/atoms/game";
import type { Rarity } from "@/types/powerups";

const rarityColors: Record<Rarity, { bg: string; border: string }> = {
  common: { bg: "bg-neutral-black/60", border: "border-neutral-x-dark/40" },
  uncommon: { bg: "bg-green-dark/60", border: "border-green-medium/40" },
  rare: { bg: "bg-blue-dark/60", border: "border-blue-medium/40" },
  legendary: { bg: "bg-orange-dark/60", border: "border-orange-medium/40" },
};

export default function PowerupsRow() {
  const [powerups] = useAtom(powerupsAtom);

  if (powerups.length === 0) return null;

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      {powerups.map((powerup, i) => {
        const colors = rarityColors[powerup.rarity];
        return (
          <div
            key={`${powerup.name}-${i}`}
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
      })}
    </div>
  );
}
