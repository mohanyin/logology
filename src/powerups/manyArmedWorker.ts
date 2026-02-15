import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const manyArmedWorker: Powerup = {
  name: "Many-armed Worker",
  description: "+100 points if the word has 6 or more letters",
  rarity: "common",
  price: 6,
  tags: ["points"],
  imagePath: "/powerups/many_armed_worker.jpeg",
  onWordScored: (ctx) => {
    if (ctx.currentWord.length >= 6) return { points: 100 };
    return NO_EFFECT;
  },
};

export default manyArmedWorker;
