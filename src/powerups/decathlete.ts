import type { Powerup, PowerupState } from "@/types/powerups";

export default function createDecathlete(saved?: PowerupState): Powerup {
  let bonusMultiplier = typeof saved === "number" ? saved : 1.0;
  const BONUS_PER_VERB = 0.1;

  return {
    name: "Decathlete",
    description:
      "Gains 0.1x bonus multiplier for every verb played (starts at 1.0x)",
    rarity: "rare",
    price: 8,
    tags: ["multiplier"],
    imagePath: "/powerups/decathlete.png",
    getState: () => bonusMultiplier,
    onWordScored: (ctx) => {
      if (ctx.currentWord.isVerb) {
        bonusMultiplier += BONUS_PER_VERB;
        return { multiplier: bonusMultiplier };
      }
      return null;
    },
  };
}
