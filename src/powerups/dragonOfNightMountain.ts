import type { Powerup, PowerupState } from "@/types/powerups";

export default function createDragonOfNightMountain(
  saved?: PowerupState,
): Powerup {
  let bonusMultiplier = typeof saved === "number" ? saved : 1.0;
  const BONUS_PER_TILE = 0.1;

  return {
    name: "Dragon of Night Mountain",
    description:
      "Gains 0.1x bonus for every tile bought. Applies multiplier to every word.",
    rarity: "rare",
    price: 8,
    tags: ["multiplier"],
    imagePath: "/powerups/dragon.png",
    getState: () => bonusMultiplier,
    onTileBought: () => {
      bonusMultiplier += BONUS_PER_TILE;
      return null;
    },
    onWordScored: () => {
      return { multiplier: bonusMultiplier };
    },
  };
}
