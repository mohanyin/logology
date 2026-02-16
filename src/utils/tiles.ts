export interface Tile {
  letter: string;
  points: number;
}

export type Letter = keyof typeof STARTING_TILE_CONFIG;

export const STARTING_TILE_CONFIG = {
  A: { count: 6, points: 1 },
  B: { count: 2, points: 3 },
  C: { count: 2, points: 3 },
  D: { count: 3, points: 2 },
  E: { count: 9, points: 1 },
  F: { count: 2, points: 4 },
  G: { count: 2, points: 2 },
  H: { count: 2, points: 4 },
  I: { count: 6, points: 1 },
  J: { count: 1, points: 8 },
  K: { count: 1, points: 5 },
  L: { count: 3, points: 1 },
  M: { count: 2, points: 3 },
  N: { count: 4, points: 1 },
  O: { count: 6, points: 1 },
  P: { count: 2, points: 3 },
  Q: { count: 1, points: 10 },
  R: { count: 4, points: 1 },
  S: { count: 3, points: 1 },
  T: { count: 4, points: 1 },
  U: { count: 3, points: 1 },
  V: { count: 2, points: 4 },
  W: { count: 2, points: 4 },
  X: { count: 1, points: 8 },
  Y: { count: 2, points: 4 },
  Z: { count: 1, points: 10 },
} as const;

export const createStartingTiles = (): Tile[] => {
  return Object.entries(STARTING_TILE_CONFIG)
    .flatMap(([letter, { count }]) =>
      Array(count).fill({
        letter,
        points: STARTING_TILE_CONFIG[letter as Letter].points,
      }),
    )
    .sort(() => Math.random() - 0.5);
};
