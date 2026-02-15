import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const RARE_LETTERS = ["Q", "X", "J", "K", "Z"];

const hipster: Powerup = {
  name: "Hipster",
  description:
    "Doubles the multiplier for each of the five least used English letters (J, K, Q, X, Z)",
  rarity: "uncommon",
  price: 8,
  tags: ["multiplier"],
  imagePath: "/powerups/hipster.jpg",
  onLetterScored: (ctx, details) => {
    if (RARE_LETTERS.includes(details.letter))
      return { multiplier: ctx.currentWord.multiplier };
    return NO_EFFECT;
  },
};

export default hipster;
