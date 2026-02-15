import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const BONUS_PER_WORD = 10;

export default function createClimber(): Powerup {
  let bonusPoints = 0;

  return {
    name: "The Climber",
    description: "Gains a +10 pts bonus for every 5-letter word played",
    rarity: "uncommon",
    price: 8,
    tags: ["points"],
    imagePath: "/powerups/climber.jpg",
    onWordScored: (ctx) => {
      if (ctx.currentWord.length === 5) {
        bonusPoints += BONUS_PER_WORD;
        return { points: bonusPoints };
      }
      return NO_EFFECT;
    },
  };
}
