import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const oldFortyNiner: Powerup = {
  name: "Old Forty-Niner",
  description: "Adds +30 mult if the word can only be used as a noun",
  rarity: "uncommon",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/old_forty_niner.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.isNoun && ctx.currentWord.partsOfSpeech.length === 1)
      return { multiplier: 30 };
    return NO_EFFECT;
  },
};

export default oldFortyNiner;
