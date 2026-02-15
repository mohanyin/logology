import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ";
const VOWELS = "AEIOU";

const longbowman: Powerup = {
  name: "Longbowman",
  description: "Adds +50 points for words that match C|V|C|C",
  rarity: "common",
  price: 4,
  tags: ["points"],
  imagePath: "/powerups/longbowman.png",
  onWordScored: (ctx) => {
    const word = ctx.currentWord.word;
    if (word.length !== 4) return NO_EFFECT;
    const c0 = CONSONANTS.includes(word[0]);
    const v1 = VOWELS.includes(word[1]);
    const c2 = CONSONANTS.includes(word[2]);
    const c3 = CONSONANTS.includes(word[3]);
    if (c0 && v1 && c2 && c3) return { points: 50 };
    return NO_EFFECT;
  },
};

export default longbowman;
