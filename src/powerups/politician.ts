import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const COMMON_LETTERS = ["A", "E", "I", "O", "R"];

const politician: Powerup = {
  name: "Politician",
  description:
    "+20 pts for each of the five most used English letters (A, E, I, O, R)",
  rarity: "uncommon",
  price: 6,
  tags: ["points"],
  imagePath: "/powerups/politician.jpg",
  onLetterScored: (_ctx, details) => {
    if (COMMON_LETTERS.includes(details.letter)) return { points: 20 };
    return NO_EFFECT;
  },
};

export default politician;
