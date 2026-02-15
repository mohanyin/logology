import type { Powerup } from "@/types/powerups";

const dayTrader: Powerup = {
  name: "Day Trader",
  description: "Earn 4 extra gold for each challenge",
  rarity: "common",
  price: 6,
  tags: ["economy"],
  imagePath: "/powerups/day_trader.webp",
  onChallengeCompleted: () => ({ gold: 4 }),
};

export default dayTrader;
