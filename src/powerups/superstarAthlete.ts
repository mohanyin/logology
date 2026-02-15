import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const superstarAthlete: Powerup = {
  name: "Superstar Athlete",
  description: "Earn 10 gold if you beat the challenge with a single word.",
  rarity: "uncommon",
  price: 6,
  tags: ["economy"],
  imagePath: "/powerups/superstar_athlete.webp",
  onChallengeCompleted: (ctx) => {
    if (ctx.playedWords.length === 1) return { gold: 10 };
    return NO_EFFECT;
  },
};

export default superstarAthlete;
