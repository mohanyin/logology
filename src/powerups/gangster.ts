import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const BONUS_PER_I = 5;

export function createGangster(): Powerup {
  let bonusPoints = 0;

  return {
    name: "The Gangster",
    description: "Gains +5 pts for each I played",
    rarity: "common",
    price: 5,
    tags: ["points"],
    imagePath: "/powerups/gangster.jpeg",
    onLetterScored: (_ctx, details) => {
      if (details.letter === "I") {
        bonusPoints += BONUS_PER_I;
        return { points: bonusPoints };
      }
      return NO_EFFECT;
    },
  };
}

export default createGangster;
