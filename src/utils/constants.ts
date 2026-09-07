export const GRID_SIZE = 4;
export const BOARD_TILE_COUNT = GRID_SIZE * GRID_SIZE;

export const BASE_ROUND_COUNT = 4;

export const BASE_GOAL_SCORE = 25;
export const SCORE_SCALING_FACTOR = 1.75;

export const SHOP_OPTIONS = 4;

export const STARTING_GOLD = 0;
export const GOLD_PER_CHALLENGE = 10;
export const GOLD_PER_REROLL = 2;
export const GOLD_PER_REROLL_INCREASE = 1;
export const GOLD_PER_TILE_BASE = 1;
export const GOLD_PER_TILE_IRON = 2;
export const GOLD_PER_TILE_GOLD = 3;

export const DISCARDS_PER_ROUND = 4;
export const SHUFFLES_PER_ROUND = 4;

export const MAX_POWERUPS = 8;

/** Scoring animation: each step lasts DECAY x the previous, down to MIN. */
export const SCORE_STEP_BASE_MS = 400;
export const SCORE_STEP_DECAY = 0.8;
export const SCORE_STEP_MIN_MS = 50;
/** Beat held after the last step, before the score is committed. */
export const SCORE_SEQUENCE_HOLD_MS = 500;
export const SHAKE_DURATION_MS = 180;

/** Safety cap so a misbehaving retrigger powerup cannot stall a word. */
export const MAX_RETRIGGERS_PER_LETTER = 16;
