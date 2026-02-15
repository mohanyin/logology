import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const timeMage: Powerup = {
  name: "Time Mage",
  description:
    "Adds +100 points if the reverse of the word is also a valid word",
  rarity: "uncommon",
  price: 6,
  tags: ["points"],
  imagePath: "/powerups/time_mage.png",
  onWordScored: (ctx) => {
    const reversed = ctx.currentWord.word.split("").reverse().join("");
    if (ctx.isValidWord(reversed)) return { points: 100 };
    return NO_EFFECT;
  },
};

export default timeMage;
