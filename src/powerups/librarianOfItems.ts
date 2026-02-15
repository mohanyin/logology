import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const librarianOfItems: Powerup = {
  name: "Librarian of Items",
  description: "Adds +15 mult if the word is a noun",
  rarity: "common",
  price: 4,
  tags: ["multiplier"],
  imagePath: "/powerups/librarian_of_items.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.isNoun) return { multiplier: 15 };
    return NO_EFFECT;
  },
};

export default librarianOfItems;
