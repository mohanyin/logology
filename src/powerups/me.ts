import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

export default function createMe(): Powerup {
  let lettersPlayed = 0;
  const BONUS_POINTS = 3;

  return {
    name: "Me",
    description:
      "Adds +3 pts to every tile played. Adds +1 base mult for every ten letters you've played.",
    rarity: "common",
    price: 0,
    tags: [],
    imagePath: "/powerups/me.png",
    getStartingBonus: () => {
      const mult = Math.floor(lettersPlayed / 10);
      if (mult > 0) return { multiplier: mult };
      return NO_EFFECT;
    },
    onLetterScored: () => {
      return { points: BONUS_POINTS };
    },
    onWordScored: (ctx) => {
      lettersPlayed += ctx.currentWord.length;
      return NO_EFFECT;
    },
  };
}
