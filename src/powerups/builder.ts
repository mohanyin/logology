import type { Powerup, PowerupState } from "@/types/powerups";

const BONUS_PER_WORD = 2;

export default function createBuilder(saved?: PowerupState): Powerup {
  let bonusMultiplier = typeof saved === "number" ? saved : 0;

  return {
    name: "The Builder",
    description: "Gains +2 mult every word played",
    rarity: "common",
    price: 6,
    tags: ["multiplier"],
    imagePath: "/powerups/builder.jpg",
    getState: () => bonusMultiplier,
    onWordScored: () => {
      bonusMultiplier += BONUS_PER_WORD;
      return { multiplier: bonusMultiplier };
    },
  };
}
