import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const VOWELS = "AEIOU";

const scholar: Powerup = {
  name: "Scholar",
  description: "All vowels drawn are replaced with the letter 'A'",
  rarity: "common",
  price: 0,
  tags: [],
  imagePath: "/powerups/scholar.jpg",
  onTileDrawn: (_ctx, tile) => {
    if (VOWELS.includes(tile.letter)) {
      return { letter: "A" } as never; // tile mutation handled by caller
    }
    return NO_EFFECT;
  },
};

export default scholar;
