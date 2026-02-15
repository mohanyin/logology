import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const threeEyedAssistant: Powerup = {
  name: "Three-eyed Assistant",
  description: "+10 mult if the word has 3 or fewer letters",
  rarity: "uncommon",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/three_eyed_assistant.jpeg",
  onWordScored: (ctx) => {
    if (ctx.currentWord.length <= 3) return { multiplier: 10 };
    return NO_EFFECT;
  },
};

export default threeEyedAssistant;
