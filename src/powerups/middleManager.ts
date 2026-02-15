import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const middleManager: Powerup = {
  name: "Middle Manager",
  description: "Earn 1 gold for every two teammates you have.",
  rarity: "common",
  price: 6,
  tags: ["economy"],
  imagePath: "/powerups/middle_manager.jpeg",
  onChallengeCompleted: (ctx) => {
    const earned = Math.floor(ctx.character.powerups.length / 2);
    if (earned > 0) return { gold: earned };
    return NO_EFFECT;
  },
};

export default middleManager;
