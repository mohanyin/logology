import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const portalCustodian: Powerup = {
  name: "Portal Custodian",
  description: "Adds +50 points if the word has a long O sound",
  rarity: "common",
  price: 4,
  tags: ["points"],
  imagePath: "/powerups/portal_custodian.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.hasSound("long_o")) return { points: 50 };
    return NO_EFFECT;
  },
};

export default portalCustodian;
