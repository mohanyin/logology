import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const VOWELS = "AEIOU";

const darkestEcho: Powerup = {
  name: "Darkest Echo",
  description: "Triggers every vowel tile in the word a second time",
  rarity: "rare",
  price: 8,
  tags: ["trigger"],
  imagePath: "/powerups/darkest_echo.png",
  onLetterScored: (_ctx, details) => {
    if (VOWELS.includes(details.letter)) return { retrigger: 1 };
    return NO_EFFECT;
  },
};

export default darkestEcho;
