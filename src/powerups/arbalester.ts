import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ";
const VOWELS = "AEIOU";

const arbalester: Powerup = {
  name: "Arbalester",
  description: "Gain +15 mult for words that match C|C|V|C",
  rarity: "common",
  price: 4,
  tags: ["multiplier"],
  imagePath: "/powerups/arbalester.png",
  onWordScored: (ctx) => {
    const word = ctx.currentWord.word;
    if (word.length !== 4) return NO_EFFECT;
    const c0 = CONSONANTS.includes(word[0]);
    const c1 = CONSONANTS.includes(word[1]);
    const v2 = VOWELS.includes(word[2]);
    const c3 = CONSONANTS.includes(word[3]);
    if (c0 && c1 && v2 && c3) return { multiplier: 15 };
    return NO_EFFECT;
  },
};

export default arbalester;
