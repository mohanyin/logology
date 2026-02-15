import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const fiveArmedWorker: Powerup = {
  name: "Five-armed Worker",
  description: "+75 points if the word has 5 letters",
  rarity: "common",
  price: 6,
  tags: ["points"],
  imagePath: "/powerups/five_armed_worker.jpeg",
  onWordScored: (ctx) => {
    if (ctx.currentWord.length === 5) return { points: 75 };
    return NO_EFFECT;
  },
};

export default fiveArmedWorker;
