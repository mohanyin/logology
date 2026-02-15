import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const illinoisJames: Powerup = {
  name: "Illinois James",
  description: "Adds +100 pts if the word is a past tense verb",
  rarity: "common",
  price: 6,
  tags: ["points"],
  imagePath: "/powerups/illinois_james.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.isPastTense && ctx.currentWord.isVerb)
      return { points: 100 };
    return NO_EFFECT;
  },
};

export default illinoisJames;
