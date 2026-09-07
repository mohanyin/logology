import type { Powerup, PowerupState } from "@/types/powerups";

export default function createAbyssalVoidTerror(saved?: PowerupState): Powerup {
  let bonusMultiplier = typeof saved === "number" ? saved : 1.0;
  const BONUS_PER_TEAMMATE = 0.5;

  return {
    name: "Abyssal Void Terror",
    description:
      "Gains 0.5x bonus for every teammate sold. Applies multiplier to every word.",
    rarity: "rare",
    price: 8,
    tags: ["multiplier"],
    imagePath: "/powerups/void_terror.png",
    getState: () => bonusMultiplier,
    onTeammateSold: () => {
      bonusMultiplier += BONUS_PER_TEAMMATE;
      return null;
    },
    onWordScored: () => {
      return { multiplier: bonusMultiplier };
    },
  };
}
