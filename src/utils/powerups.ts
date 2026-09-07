import type { Powerup } from "@/types/powerups";

/** What a powerup fetches when sold. Half its shop price, rounded down. */
export const sellValue = (powerup: Powerup): number =>
  Math.floor(powerup.price / 2);
