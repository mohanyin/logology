import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const VOWELS = "AEIOU";

function hasConsecutiveVowels(word: string): boolean {
  const w = word.toUpperCase();
  for (let i = 0; i < w.length - 1; i++) {
    if (VOWELS.includes(w[i]) && VOWELS.includes(w[i + 1])) return true;
  }
  return false;
}

const oilTycoon: Powerup = {
  name: "Oil Tycoon",
  description: "Earn 2 gold for each word with two vowels in a row",
  rarity: "common",
  price: 6,
  tags: ["economy"],
  imagePath: "/powerups/oil_tycoon.jpg",
  onWordScored: (ctx) => {
    if (hasConsecutiveVowels(ctx.currentWord.word)) return { gold: 2 };
    return NO_EFFECT;
  },
};

export default oilTycoon;
