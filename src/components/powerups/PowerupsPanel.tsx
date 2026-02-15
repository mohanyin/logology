import { useAtom } from "jotai";
import { powerupsAtom } from "@/atoms/game";
import type { Rarity } from "@/types/powerups";

const rarityColors: Record<
  Rarity,
  { bg: string; border: string; badge: string }
> = {
  common: {
    bg: "bg-neutral-black/60",
    border: "border-neutral-x-dark/40",
    badge: "bg-neutral-x-dark text-neutral-white",
  },
  uncommon: {
    bg: "bg-green-dark/60",
    border: "border-green-medium/40",
    badge: "bg-green-medium text-white",
  },
  rare: {
    bg: "bg-blue-dark/60",
    border: "border-blue-medium/40",
    badge: "bg-blue-medium text-white",
  },
  legendary: {
    bg: "bg-orange-dark/60",
    border: "border-orange-medium/40",
    badge: "bg-orange-medium text-white",
  },
};

export default function PowerupsPanel() {
  const [powerups] = useAtom(powerupsAtom);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 px-4 pt-4">
      <h2 className="font-display text-neutral-black text-2xl">
        Active Powerups
      </h2>

      {powerups.length === 0 ? (
        <p className="text-neutral-x-dark">No active powerups</p>
      ) : (
        <div className="grid w-full max-w-sm grid-cols-2 gap-3">
          {powerups.map((powerup, i) => {
            const colors = rarityColors[powerup.rarity];
            return (
              <div
                key={`${powerup.name}-${i}`}
                className={`flex flex-col items-center gap-2 rounded-xl border ${colors.border} ${colors.bg} p-3 backdrop-blur-sm`}
              >
                <img
                  src={powerup.imagePath}
                  alt={powerup.name}
                  className="h-16 w-16 rounded-lg object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-neutral-white text-sm font-bold">
                    {powerup.name}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${colors.badge}`}
                  >
                    {powerup.rarity}
                  </span>
                  <p className="text-neutral-dark text-xs leading-tight">
                    {powerup.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
