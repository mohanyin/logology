import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const fourHorsemen: Powerup = {
  name: "The Four Horsemen",
  description: "Adds 2x mult if the word has 4 letters",
  rarity: "rare",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/me.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.length === 4)
      return { multiplier: ctx.currentWord.multiplier };
    return NO_EFFECT;
  },
};

export default fourHorsemen;
