import type { Powerup } from "@/types/powerups";

const POINT_OPTIONS = [0, 5, 10, 15, 20, 30, 40, 50, 80, 100, 1000];
const MULTIPLIER_OPTIONS = [0, 1, 2, 3, 5, 7, 10, 15, 25, 50, 100];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const gambler: Powerup = {
  name: "Gambler",
  description: "Adds random mult and points to the word",
  rarity: "common",
  price: 8,
  tags: ["points", "multiplier"],
  imagePath: "/powerups/gambler.jpg",
  onWordScored: () => ({
    points: pickRandom(POINT_OPTIONS),
    multiplier: pickRandom(MULTIPLIER_OPTIONS),
  }),
};

export default gambler;
