import type { Powerup } from "@/types/powerups";

const investmentBanker: Powerup = {
  name: "Investment Banker",
  description: "After each challenge, earn 20% interest on your gold.",
  rarity: "uncommon",
  price: 6,
  tags: ["economy"],
  imagePath: "/powerups/investment_banker.jpg",
  onChallengeCompleted: (ctx) => {
    const earned = Math.floor(ctx.character.gold * 0.2);
    if (earned > 0) return { gold: earned };
    return null;
  },
};

export default investmentBanker;
