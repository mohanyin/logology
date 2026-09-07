export type PowerupEffect = {
  points?: number;
  multiplier?: number;
  gold?: number;
  retrigger?: number;
};

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
  getStartingBonus?: (ctx: GameContext) => PowerupEffect | null;
}
