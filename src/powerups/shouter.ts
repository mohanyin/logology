import type { Powerup } from "@/types/powerups";

const VOWELS = "AEIOU";

const shouter: Powerup = {
  name: "Shouter",
  description: "+20 pts for each vowel in the word",
  rarity: "common",
  price: 4,
  tags: ["points"],
  imagePath: "/powerups/shouter.jpg",
  onLetterScored: (_ctx, details) => {
    if (VOWELS.includes(details.letter)) return { points: 20 };
    return null;
  },
};

export default shouter;
