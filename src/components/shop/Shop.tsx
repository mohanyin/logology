import { useCallback, useMemo } from "react";
import { useAtom } from "jotai";
import { goldAtom, powerupsAtom, startGame } from "@/atoms/game";
import { SHOP_OPTIONS, MAX_POWERUPS } from "@/utils/constants";
import { createAllPowerups } from "@/powerups/index";
import type { Powerup, Rarity } from "@/types/powerups";

function pickRandom(pool: Powerup[], count: number): Powerup[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

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

export default function Shop() {
  const [gold, setGold] = useAtom(goldAtom);
  const [powerups, setPowerups] = useAtom(powerupsAtom);

  const shopChoices = useMemo(() => {
    const all = createAllPowerups();
    const ownedNames = new Set(powerups.map((p) => p.name));
    const available = all.filter((p) => !ownedNames.has(p.name));
    return pickRandom(
      available.length >= SHOP_OPTIONS ? available : all,
      SHOP_OPTIONS,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuy = useCallback(
    (powerup: Powerup) => {
      if (gold < powerup.price) return;
      if (powerups.length >= MAX_POWERUPS) return;
      setGold((prev) => prev - powerup.price);
      setPowerups((prev) => [...prev, powerup]);
    },
    [gold, powerups.length, setGold, setPowerups],
  );

  return (
    <div className="flex h-full w-full flex-col items-center gap-6 px-4 py-8">
      <h1 className="font-display text-neutral-black text-3xl">Shop</h1>

      <div className="flex items-center gap-2">
        <span className="text-orange-medium text-xl font-bold">{gold}g</span>
        <span className="text-neutral-x-dark text-sm">available</span>
      </div>

      <div className="flex w-full max-w-md flex-col gap-4">
        {shopChoices.map((powerup, i) => {
          const colors = rarityColors[powerup.rarity];
          const canAfford = gold >= powerup.price;
          const alreadyOwned = powerups.some((p) => p.name === powerup.name);
          const atCapacity = powerups.length >= MAX_POWERUPS;

          return (
            <div
              key={`${powerup.name}-${i}`}
              className={`flex items-center gap-4 rounded-xl border ${colors.border} ${colors.bg} p-4 backdrop-blur-sm`}
            >
              <img
                src={powerup.imagePath}
                alt={powerup.name}
                className="h-16 w-16 flex-none rounded-lg object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-white font-bold">
                    {powerup.name}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${colors.badge}`}
                  >
                    {powerup.rarity}
                  </span>
                </div>
                <p className="text-neutral-dark text-xs leading-tight">
                  {powerup.description}
                </p>
              </div>
              <button
                onClick={() => handleBuy(powerup)}
                disabled={!canAfford || alreadyOwned || atCapacity}
                className={`flex-none rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                  alreadyOwned
                    ? "bg-neutral-dark text-neutral-x-dark cursor-not-allowed"
                    : !canAfford || atCapacity
                      ? "bg-neutral-dark text-neutral-x-dark cursor-not-allowed opacity-50"
                      : "bg-orange-medium hover:bg-orange-dark cursor-pointer text-white"
                }`}
              >
                {alreadyOwned ? "Owned" : `${powerup.price}g`}
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={startGame}
        className="bg-green-medium hover:bg-green-dark mt-4 rounded-lg px-8 py-3 text-lg font-bold text-white transition-colors"
      >
        Continue &rarr;
      </button>
    </div>
  );
}
