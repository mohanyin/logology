import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const angryUberDriver: Powerup = {
  name: "Angry Uber Driver",
  description: "Gives 3x for each D in the word",
  rarity: "rare",
  price: 8,
  tags: ["multiplier"],
  imagePath: "/powerups/angry_uber_driver.png",
  onLetterScored: (_ctx, details) => {
    if (details.letter === "D") return { multiplier: 2 };
    return NO_EFFECT;
  },
};

export default angryUberDriver;
