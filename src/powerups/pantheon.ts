import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const pantheon: Powerup = {
  name: "The Pantheon",
  description: "Adds 4x mult if the word has 6 or more letters",
  rarity: "rare",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/me.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.length >= 6)
      return { multiplier: 3 * ctx.currentWord.multiplier };
    return NO_EFFECT;
  },
};

export default pantheon;
