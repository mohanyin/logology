import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const hoarderOfMiscellanea: Powerup = {
  name: "Hoarder of Miscellanea",
  description:
    "Adds +25 mult if the word is not a noun, verb, adjective, or adverb",
  rarity: "common",
  price: 4,
  tags: ["multiplier"],
  imagePath: "/powerups/hoarder_of_miscellanea.png",
  onWordScored: (ctx) => {
    const { isNoun, isVerb, isAdjective, isAdverb } = ctx.currentWord;
    if (!isNoun && !isVerb && !isAdjective && !isAdverb)
      return { multiplier: 25 };
    return NO_EFFECT;
  },
};

export default hoarderOfMiscellanea;
