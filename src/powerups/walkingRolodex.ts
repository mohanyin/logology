import type { Powerup } from "@/types/powerups";

const walkingRolodex: Powerup = {
  name: "Walking Rolodex",
  description:
    "Doubles the multiplier if all letters in the word are in alphabetical order",
  rarity: "rare",
  price: 6,
  tags: ["multiplier"],
  imagePath: "/powerups/rolodex.png",
  onWordScored: (ctx) => {
    const word = ctx.currentWord.word;
    for (let i = 1; i < word.length; i++) {
      if (word[i] < word[i - 1]) return null;
    }
    return { multiplier: ctx.currentWord.multiplier };
  },
};

export default walkingRolodex;
