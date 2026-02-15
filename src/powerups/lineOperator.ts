import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const lineOperator: Powerup = {
  name: "Line Operator",
  description: "Adds +7 mult for each letter in alphabetical order",
  rarity: "uncommon",
  price: 4,
  tags: ["multiplier"],
  imagePath: "/powerups/line_operator.png",
  onLetterScored: (ctx, details) => {
    if (details.index === 0) return NO_EFFECT;
    const word = ctx.currentWord.word;
    const prevLetter = word[details.index - 1];
    if (details.letter >= prevLetter) return { multiplier: 7 };
    return NO_EFFECT;
  },
};

export default lineOperator;
