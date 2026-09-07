import type { Powerup } from "@/types/powerups";

const VOWELS = "AEIOU";

const yodeler: Powerup = {
  name: "Yodeler",
  description: "Gives 0.5x for each vowel in the word",
  rarity: "rare",
  price: 8,
  tags: ["multiplier"],
  imagePath: "/powerups/yodeler.png",
  onLetterScored: (_ctx, details) => {
    if (VOWELS.includes(details.letter)) return { multiplier: 0.5 };
    return null;
  },
};

export default yodeler;
