import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const leonardo: Powerup = {
  name: "Leonardo",
  description: "3x the multiplier if the word is an adjective",
  rarity: "rare",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/marble_sculptor.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.isAdjective)
      return { multiplier: ctx.currentWord.multiplier * 2 };
    return NO_EFFECT;
  },
};

export default leonardo;
