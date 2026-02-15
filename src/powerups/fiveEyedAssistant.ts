import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const fiveEyedAssistant: Powerup = {
  name: "Five-eyed Assistant",
  description: "+20 mult if the word has 5 letters",
  rarity: "uncommon",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/five_eyed_assistant.jpeg",
  onWordScored: (ctx) => {
    if (ctx.currentWord.length === 5) return { multiplier: 20 };
    return NO_EFFECT;
  },
};

export default fiveEyedAssistant;
