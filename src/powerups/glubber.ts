import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const glubber: Powerup = {
  name: "Glubber",
  description: "Triggers the most valuable tile two more times",
  rarity: "rare",
  price: 8,
  tags: ["trigger"],
  imagePath: "/powerups/glubber.png",
  onLetterScored: (_ctx, details) => {
    const maxPoints = Math.max(...details.allTiles.map((t) => t.points));
    if (details.points === maxPoints) return { retrigger: 2 };
    return NO_EFFECT;
  },
};

export default glubber;
