export type PowerupEffect = {
  points?: number;
  multiplier?: number;
  gold?: number;
  retrigger?: number;
};

export const NO_EFFECT: PowerupEffect = {};

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

  onWordScored?: (ctx: GameContext) => PowerupEffect;
  onLetterScored?: (ctx: GameContext, details: LetterDetails) => PowerupEffect;
  onTileDrawn?: (ctx: GameContext, tile: { letter: string }) => PowerupEffect;
  onChallengeCompleted?: (ctx: GameContext) => PowerupEffect;
  onTileBought?: (ctx: GameContext, tile: { letter: string }) => PowerupEffect;
  onTeammateSold?: (ctx: GameContext, teammate: Powerup) => PowerupEffect;
  getStartingBonus?: (ctx: GameContext) => PowerupEffect;
}
