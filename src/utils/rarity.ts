import type { Rarity } from "@/types/powerups";

/** Shared palette for powerup cards, chips and badges. */
export const rarityColors: Record<
  Rarity,
  { bg: string; border: string; badge: string }
> = {
  common: {
    bg: "bg-neutral-black/60",
    border: "border-neutral-x-dark/40",
    badge: "bg-neutral-x-dark text-neutral-white",
  },
  uncommon: {
    bg: "bg-green-dark/60",
    border: "border-green-medium/40",
    badge: "bg-green-medium text-white",
  },
  rare: {
    bg: "bg-blue-dark/60",
    border: "border-blue-medium/40",
    badge: "bg-blue-medium text-white",
  },
  legendary: {
    bg: "bg-orange-dark/60",
    border: "border-orange-medium/40",
    badge: "bg-orange-medium text-white",
  },
};
