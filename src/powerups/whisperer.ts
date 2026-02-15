import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ";

const whisperer: Powerup = {
  name: "Whisperer",
  description: "+15 pts for each consonant in the word",
  rarity: "common",
  price: 4,
  tags: ["points"],
  imagePath: "/powerups/whisperer.png",
  onLetterScored: (_ctx, details) => {
    if (CONSONANTS.includes(details.letter)) return { points: 15 };
    return NO_EFFECT;
  },
};

export default whisperer;
