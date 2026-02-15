import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const FORBIDDEN = ["I", "O", "U"];

function avoidsLetters(word: string): boolean {
  const w = word.toUpperCase();
  return !FORBIDDEN.some((c) => w.includes(c));
}

const creditAgency: Powerup = {
  name: "Credit Agency",
  description: "Gives 3x if you don't use the letters I, O, or U",
  rarity: "rare",
  price: 8,
  tags: ["multiplier"],
  imagePath: "/powerups/credit_agency.png",
  onWordScored: (ctx) => {
    if (avoidsLetters(ctx.currentWord.word)) return { multiplier: 2 };
    return NO_EFFECT;
  },
};

export default creditAgency;
