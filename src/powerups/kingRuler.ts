import type { Powerup } from "@/types/powerups";

const kingRuler: Powerup = {
  name: "King Ruler",
  description: "Gives 0.3x for each letter in the word",
  rarity: "rare",
  price: 8,
  tags: ["multiplier"],
  imagePath: "/powerups/king_ruler.png",
  onWordScored: (ctx) => ({
    multiplier: 0.3 * ctx.currentWord.length,
  }),
};

export default kingRuler;
