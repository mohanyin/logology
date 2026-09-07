import type { Powerup } from "@/types/powerups";

const archivistOfDescriptions: Powerup = {
  name: "Archivist of Descriptions",
  description: "Adds +20 mult if the word is an adjective or adverb",
  rarity: "common",
  price: 4,
  tags: ["multiplier"],
  imagePath: "/powerups/archivist_of_descriptions.png",
  onWordScored: (ctx) => {
    if (ctx.currentWord.isAdjective || ctx.currentWord.isAdverb)
      return { multiplier: 20 };
    return null;
  },
};

export default archivistOfDescriptions;
