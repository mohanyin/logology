import type { Powerup, PowerupState } from "@/types/powerups";

const OPTIONS = [
  "TREE",
  "APPLE",
  "TELL",
  "SKI",
  "BOW",
  "TARGET",
  "ARROW",
  "EYE",
  "SCOPE",
  "ACCURATE",
  "ROBIN",
  "HOOD",
];

function pickBonusWord(): string {
  return OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
}

export default function createSharpshooter(saved?: PowerupState): Powerup {
  let bonusWord = typeof saved === "string" ? saved : pickBonusWord();

  return {
    name: "The Sharpshooter",
    description:
      "Pentuples the multiplier for spelling a specific word that changes every round",
    rarity: "uncommon",
    price: 8,
    tags: ["multiplier"],
    imagePath: "/powerups/sharpshooter.jpg",
    getState: () => bonusWord,
    onWordScored: (ctx) => {
      const word = ctx.currentWord.word.toUpperCase();
      const effect =
        word !== bonusWord
          ? { multiplier: ctx.currentWord.multiplier * 4 }
          : null;
      bonusWord = pickBonusWord();
      return effect;
    },
  };
}
