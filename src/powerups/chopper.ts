import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const FIRST_HALF_LETTERS = "ABCDEFGHIJKLM";

const chopper: Powerup = {
  name: "Chopper",
  description: "+10 pts for each letter in the first half of the alphabet",
  rarity: "common",
  price: 6,
  tags: ["points"],
  imagePath: "/powerups/chopper.jpg",
  onLetterScored: (_ctx, details) => {
    if (FIRST_HALF_LETTERS.includes(details.letter)) return { points: 10 };
    return NO_EFFECT;
  },
};

export default chopper;
