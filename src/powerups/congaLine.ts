import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const VOWELS = "AEIOU";

const congaLine: Powerup = {
  name: "Conga Line",
  description: "Doubles the multiplier if the word starts with a vowel",
  rarity: "rare",
  price: 8,
  tags: ["multiplier"],
  imagePath: "/powerups/conga_line.png",
  onWordScored: (ctx) => {
    const first = ctx.currentWord.word[0]?.toUpperCase();
    if (first && VOWELS.includes(first))
      return { multiplier: ctx.currentWord.multiplier };
    return NO_EFFECT;
  },
};

export default congaLine;
