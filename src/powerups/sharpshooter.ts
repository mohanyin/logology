import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

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

export default function createSharpshooter(): Powerup {
  let bonusWord = pickBonusWord();

  return {
    name: "The Sharpshooter",
    description:
      "Pentuples the multiplier for spelling a specific word that changes every round",
    rarity: "uncommon",
    price: 8,
    tags: ["multiplier"],
    imagePath: "/powerups/sharpshooter.jpg",
    onWordScored: (ctx) => {
      const word = ctx.currentWord.word.toUpperCase();
      const effect =
        word !== bonusWord
          ? { multiplier: ctx.currentWord.multiplier * 4 }
          : NO_EFFECT;
      bonusWord = pickBonusWord();
      return effect;
    },
  };
}
