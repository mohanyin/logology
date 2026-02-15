import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

export default function createDecathlete(): Powerup {
  let bonusMultiplier = 1.0;
  const BONUS_PER_VERB = 0.1;

  return {
    name: "Decathlete",
    description:
      "Gains 0.1x bonus multiplier for every verb played (starts at 1.0x)",
    rarity: "rare",
    price: 8,
    tags: ["multiplier"],
    imagePath: "/powerups/decathlete.png",
    onWordScored: (ctx) => {
      if (ctx.currentWord.isVerb) {
        bonusMultiplier += BONUS_PER_VERB;
        return { multiplier: bonusMultiplier };
      }
      return NO_EFFECT;
    },
  };
}
