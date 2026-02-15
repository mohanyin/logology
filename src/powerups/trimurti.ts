import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const trimurti: Powerup = {
  name: "Trimurti",
  description: "Adds 2x mult if the word has 3 or fewer letters",
  rarity: "rare",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/me.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.length <= 3)
      return { multiplier: ctx.currentWord.multiplier };
    return NO_EFFECT;
  },
};

export default trimurti;
