import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ";
const VOWELS = "AEIOU";

const siegeEngineer: Powerup = {
  name: "Siege Engineer",
  description: "Gain 3x points for words that match C|C|V|V|C",
  rarity: "uncommon",
  price: 4,
  tags: ["multiplier"],
  imagePath: "/powerups/siege_engineer.png",
  onWordScored: (ctx) => {
    const word = ctx.currentWord.word;
    if (word.length !== 5) return NO_EFFECT;
    const c0 = CONSONANTS.includes(word[0]);
    const c1 = CONSONANTS.includes(word[1]);
    const v2 = VOWELS.includes(word[2]);
    const v3 = VOWELS.includes(word[3]);
    const c4 = CONSONANTS.includes(word[4]);
    if (c0 && c1 && v2 && v3 && c4) return { multiplier: 2 };
    return NO_EFFECT;
  },
};

export default siegeEngineer;
