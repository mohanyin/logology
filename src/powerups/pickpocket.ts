import type { Powerup } from "@/types/powerups";
import { STARTING_TILE_CONFIG } from "@/utils/tiles";

export default function createPickpocket(): Powerup {
  const allLetters = Object.keys(STARTING_TILE_CONFIG);
  let bonusLetter = "D";

  function pickBonusLetter(): string {
    return allLetters[Math.floor(Math.random() * allLetters.length)];
  }

  return {
    name: "The Pickpocket",
    description:
      "For one specific letter, earn gold equal to the points of the letter",
    rarity: "rare",
    price: 8,
    tags: ["economy"],
    imagePath: "/powerups/pickpocket.webp",
    onLetterScored: (_ctx, details) => {
      if (details.letter === bonusLetter) {
        return { gold: details.points };
      }
      return null;
    },
    onWordScored: () => {
      bonusLetter = pickBonusLetter();
      return null;
    },
  };
}
