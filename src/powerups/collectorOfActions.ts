import type { Powerup } from "@/types/powerups";

const collectorOfActions: Powerup = {
  name: "Collector of Actions",
  description: "Adds +15 mult if the word is a verb",
  rarity: "common",
  price: 4,
  tags: ["multiplier"],
  imagePath: "/powerups/collector_of_actions.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.isVerb) return { multiplier: 15 };
    return null;
  },
};

export default collectorOfActions;
