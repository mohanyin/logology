export type PowerupEffect = {
  points?: number;
  multiplier?: number;
  gold?: number;
  retrigger?: number;
};

/** The accumulated state of a powerup that changes over a run. */
export type PowerupState = number | string;

export type Rarity = "common" | "uncommon" | "rare" | "legendary";

export type LetterDetails = {
  letter: string;
  index: number;
  points: number;
  allTiles: { letter: string; points: number }[];
};

export type GameContext = {
  currentWord: {
    word: string;
    length: number;
    multiplier: number;
    // Stubbed part-of-speech flags — always false until a POS data source is added
    isNoun: boolean;
    isVerb: boolean;
    isAdjective: boolean;
    isAdverb: boolean;
    isPastTense: boolean;
    isGerund: boolean;
    partsOfSpeech: string[];
    hasSound: (sound: string) => boolean;
  };
  playedWords: string[];
  character: { gold: number; powerups: Powerup[] };
  isValidWord: (word: string) => boolean;
};

export interface Powerup {
  name: string;
  description: string;
  rarity: Rarity;
  price: number;
  tags: string[];
  imagePath: string;

  /**
   * Present only on powerups that accumulate state across a run. Read when
   * saving so the value survives a reload; pass it back to the factory to
   * restore. Powerups mutate their state in place, so there is no atom write
   * to observe — this accessor is the only way to see it.
   */
  getState?: () => PowerupState;

  onWordScored?: (ctx: GameContext) => PowerupEffect | null;
  onLetterScored?: (
    ctx: GameContext,
    details: LetterDetails,
  ) => PowerupEffect | null;
  onTileDrawn?: (
    ctx: GameContext,
    tile: { letter: string },
  ) => PowerupEffect | null;
  onChallengeCompleted?: (ctx: GameContext) => PowerupEffect | null;
  onTileBought?: (
    ctx: GameContext,
    tile: { letter: string },
  ) => PowerupEffect | null;
  onTeammateSold?: (
    ctx: GameContext,
    teammate: Powerup,
  ) => PowerupEffect | null;
}
