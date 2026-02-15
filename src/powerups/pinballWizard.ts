import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const pinballWizard: Powerup = {
  name: "Pinball Wizard",
  description: "+8 mult for each B, O, N, U, or S",
  rarity: "uncommon",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/pinball_wizard.png",
  onLetterScored: (_ctx, details) => {
    if ("BONUS".includes(details.letter)) return { multiplier: 8 };
    return NO_EFFECT;
  },
};

export default pinballWizard;
