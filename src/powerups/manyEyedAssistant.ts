import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const manyEyedAssistant: Powerup = {
  name: "Many-eyed Assistant",
  description: "+30 mult if the word has 6 or more letters",
  rarity: "uncommon",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/many_eyed_assistant.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.length >= 6) return { multiplier: 30 };
    return NO_EFFECT;
  },
};

export default manyEyedAssistant;
