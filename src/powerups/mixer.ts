import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const DIPHTHONGS = ["ai", "au", "ei", "eu", "oi", "ou", "ui", "ue"];

function hasDiphthong(word: string): boolean {
  const w = word.toLowerCase();
  return DIPHTHONGS.some((d) => w.includes(d));
}

const mixer: Powerup = {
  name: "Mixer",
  description: "+25 mult if the word contains a diphthong",
  rarity: "common",
  price: 4,
  tags: ["multiplier"],
  imagePath: "/powerups/mixer.png",
  onWordScored: (ctx) => {
    if (hasDiphthong(ctx.currentWord.word)) return { multiplier: 25 };
    return NO_EFFECT;
  },
};

export default mixer;
