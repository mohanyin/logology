import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ";

function hasConsecutiveConsonants(word: string): boolean {
  const w = word.toUpperCase();
  for (let i = 0; i < w.length - 1; i++) {
    if (CONSONANTS.includes(w[i]) && CONSONANTS.includes(w[i + 1])) return true;
  }
  return false;
}

const backToBackDuo: Powerup = {
  name: "Back-to-Back Duo",
  description: "+50 pts if the word has two consonants in a row",
  rarity: "common",
  price: 4,
  tags: ["points"],
  imagePath: "/powerups/back_to_back_duo.jpg",
  onWordScored: (ctx) => {
    if (hasConsecutiveConsonants(ctx.currentWord.word)) return { points: 50 };
    return NO_EFFECT;
  },
};

export default backToBackDuo;
