import type { Powerup, PowerupState } from "@/types/powerups";

const BONUS_PER_I = 5;

export function createGangster(saved?: PowerupState): Powerup {
  let bonusPoints = typeof saved === "number" ? saved : 0;

  return {
    name: "The Gangster",
    description: "Gains +5 pts for each I played",
    rarity: "common",
    price: 5,
    tags: ["points"],
    imagePath: "/powerups/gangster.jpeg",
    getState: () => bonusPoints,
    onLetterScored: (_ctx, details) => {
      if (details.letter === "I") {
        bonusPoints += BONUS_PER_I;
        return { points: bonusPoints };
      }
      return null;
    },
  };
}

export default createGangster;
