import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

function isPalindrome(word: string): boolean {
  const w = word.toUpperCase();
  for (let i = 0; i < Math.floor(w.length / 2); i++) {
    if (w[i] !== w[w.length - 1 - i]) return false;
  }
  return true;
}

const translator: Powerup = {
  name: "Translator",
  description: "Double the multiplier if the word is a palindrome",
  rarity: "uncommon",
  price: 8,
  tags: ["multiplier"],
  imagePath: "/powerups/translator.jpeg",
  onWordScored: (ctx) => {
    if (isPalindrome(ctx.currentWord.word))
      return { multiplier: ctx.currentWord.multiplier };
    return NO_EFFECT;
  },
};

export default translator;
