import type { Powerup } from "@/types/powerups";
import { NO_EFFECT } from "@/types/powerups";

function sharesNoLetters(current: string, previous: string): boolean {
  const curr = new Set(current.toUpperCase());
  const prev = previous.toUpperCase();
  for (const c of prev) {
    if (curr.has(c)) return false;
  }
  return true;
}

const dodgeballChampion: Powerup = {
  name: "Dodgeball Champion",
  description:
    "Doubles the multiplier if the word does not contain any letters from the previous word",
  rarity: "rare",
  price: 8,
  tags: ["multiplier"],
  imagePath: "/powerups/dodgeball_champion.jpg",
  onWordScored: (ctx) => {
    const { playedWords, currentWord } = ctx;
    if (playedWords.length === 0) return NO_EFFECT;
    const lastWord = playedWords[playedWords.length - 1];
    if (sharesNoLetters(currentWord.word, lastWord))
      return { multiplier: currentWord.multiplier };
    return NO_EFFECT;
  },
};

export default dodgeballChampion;
