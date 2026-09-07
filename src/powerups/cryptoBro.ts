import type { Powerup, PowerupState } from "@/types/powerups";

export default function createCryptoBro(saved?: PowerupState): Powerup {
  let bonusGold = typeof saved === "number" ? saved : 1;
  const BONUS_PER_CHALLENGE = 1;

  return {
    name: "The Crypto Bro",
    description:
      "Earn an extra gold for each challenge. Gains 1 gold after each challenge.",
    rarity: "rare",
    price: 8,
    tags: ["economy"],
    imagePath: "/powerups/crypto_bro.png",
    getState: () => bonusGold,
    onChallengeCompleted: () => {
      const gold = bonusGold;
      bonusGold += BONUS_PER_CHALLENGE;
      return { gold };
    },
  };
}
