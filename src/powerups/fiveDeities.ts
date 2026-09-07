import type { Powerup } from "@/types/powerups";

const fiveDeities: Powerup = {
  name: "The Five Deities",
  description: "Adds 3x mult if the word has 5 letters",
  rarity: "rare",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/me.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.length === 5)
      return { multiplier: 2 * ctx.currentWord.multiplier };
    return null;
  },
};

export default fiveDeities;
