import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

export default function createDragonOfNightMountain(): Powerup {
  let bonusMultiplier = 1.0;
  const BONUS_PER_TILE = 0.1;

  return {
    name: "Dragon of Night Mountain",
    description:
      "Gains 0.1x bonus for every tile bought. Applies multiplier to every word.",
    rarity: "rare",
    price: 8,
    tags: ["multiplier"],
    imagePath: "/powerups/dragon.png",
    onTileBought: () => {
      bonusMultiplier += BONUS_PER_TILE;
      return NO_EFFECT;
    },
    onWordScored: () => {
      return { multiplier: bonusMultiplier };
    },
  };
}
