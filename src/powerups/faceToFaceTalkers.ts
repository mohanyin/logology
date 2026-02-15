import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

const VOWELS = "AEIOU";

function hasConsecutiveVowels(word: string): boolean {
  const w = word.toUpperCase();
  for (let i = 0; i < w.length - 1; i++) {
    if (VOWELS.includes(w[i]) && VOWELS.includes(w[i + 1])) return true;
  }
  return false;
}

const faceToFaceTalkers: Powerup = {
  name: "Face-to-Face Talkers",
  description: "+75 pts if the word has two vowels in a row",
  rarity: "common",
  price: 4,
  tags: ["points"],
  imagePath: "/powerups/face_to_face_talkers.jpg",
  onWordScored: (ctx) => {
    if (hasConsecutiveVowels(ctx.currentWord.word)) return { points: 75 };
    return NO_EFFECT;
  },
};

export default faceToFaceTalkers;
