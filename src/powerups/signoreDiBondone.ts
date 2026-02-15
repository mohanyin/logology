import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const signoreDiBondone: Powerup = {
  name: "Signore di Bondone",
  description: "3x the multiplier if the word is a gerund",
  rarity: "rare",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/signore_di_bondone.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.isGerund)
      return { multiplier: ctx.currentWord.multiplier * 2 };
    return NO_EFFECT;
  },
};

export default signoreDiBondone;
