import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const NATO_WORDS = [
  "ALPHA",
  "BRAVO",
  "CHARLIE",
  "DELTA",
  "ECHO",
  "FOXTROT",
  "GOLF",
  "HOTEL",
  "INDIA",
  "JULIET",
  "KILO",
  "LIMA",
  "MIKE",
  "NOVEMBER",
  "OSCAR",
  "PAPA",
  "QUEBEC",
  "ROMEO",
  "SIERRA",
  "TANGO",
  "UNIFORM",
  "VICTOR",
  "WHISKEY",
  "XRAY",
  "YANKEE",
  "ZULU",
];

const defenseMinister: Powerup = {
  name: "Defense Minister",
  description:
    "Triples the multiplier if the word is used in the NATO alphabet",
  rarity: "uncommon",
  price: 8,
  tags: ["multiplier"],
  imagePath: "/powerups/defense_minister.jpg",
  onWordScored: (ctx) => {
    const word = ctx.currentWord.word.toUpperCase();
    if (NATO_WORDS.includes(word))
      return { multiplier: ctx.currentWord.multiplier * 2 };
    return NO_EFFECT;
  },
};

export default defenseMinister;
