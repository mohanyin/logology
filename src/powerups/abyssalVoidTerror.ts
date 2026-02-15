import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

export default function createAbyssalVoidTerror(): Powerup {
  let bonusMultiplier = 1.0;
  const BONUS_PER_TEAMMATE = 0.5;

  return {
    name: "Abyssal Void Terror",
    description:
      "Gains 0.5x bonus for every teammate sold. Applies multiplier to every word.",
    rarity: "rare",
    price: 8,
    tags: ["multiplier"],
    imagePath: "/powerups/void_terror.png",
    onTeammateSold: () => {
      bonusMultiplier += BONUS_PER_TEAMMATE;
      return NO_EFFECT;
    },
    onWordScored: () => {
      return { multiplier: bonusMultiplier };
    },
  };
}
