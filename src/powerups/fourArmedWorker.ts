import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const fourArmedWorker: Powerup = {
  name: "Four-armed Worker",
  description: "+50 points if the word has 4 letters",
  rarity: "common",
  price: 6,
  tags: ["points"],
  imagePath: "/powerups/four_armed_worker.jpeg",
  onWordScored: (ctx) => {
    if (ctx.currentWord.length === 4) return { points: 50 };
    return NO_EFFECT;
  },
};

export default fourArmedWorker;
