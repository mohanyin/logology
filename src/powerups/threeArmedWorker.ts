import type { Powerup } from "@/types/powerups";

const threeArmedWorker: Powerup = {
  name: "Three-armed Worker",
  description: "+30 points if the word has 3 or fewer letters",
  rarity: "common",
  price: 4,
  tags: ["points"],
  imagePath: "/powerups/three_armed_worker.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.length <= 3) return { points: 30 };
    return null;
  },
};

export default threeArmedWorker;
