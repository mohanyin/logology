import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const fourEyedAssistant: Powerup = {
  name: "Four-eyed Assistant",
  description: "+15 mult if the word has 4 letters",
  rarity: "uncommon",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/four_eyed_assistant.jpeg",
  onWordScored: (ctx) => {
    if (ctx.currentWord.length === 4) return { multiplier: 15 };
    return NO_EFFECT;
  },
};

export default fourEyedAssistant;
