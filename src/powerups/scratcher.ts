import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const VOWELS = "AEIOU";

function countVowels(word: string): number {
  let count = 0;
  const w = word.toUpperCase();
  for (const c of w) {
    if (VOWELS.includes(c)) count++;
  }
  return count;
}

const scratcher: Powerup = {
  name: "Scratcher",
  description:
    "25% chance to double the multiplier. Gain an extra 25% for each vowel.",
  rarity: "common",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/scratcher.webp",
  onWordScored: (ctx) => {
    const vowelCount = countVowels(ctx.currentWord.word);
    const chance = 0.25 * (1 + vowelCount);
    if (Math.random() < chance)
      return { multiplier: ctx.currentWord.multiplier };
    return NO_EFFECT;
  },
};

export default scratcher;
