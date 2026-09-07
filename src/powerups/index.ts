import type { Powerup, PowerupState } from "@/types/powerups";

// Parts of speech
import librarianOfItems from "./librarianOfItems";
import collectorOfActions from "./collectorOfActions";
import archivistOfDescriptions from "./archivistOfDescriptions";
import hoarderOfMiscellanea from "./hoarderOfMiscellanea";
import oldFortyNiner from "./oldFortyNiner";
import illinoisJames from "./illinoisJames";
import signoreDiBondone from "./signoreDiBondone";
import leonardo from "./leonardo";
import createDecathlete from "./decathlete";
import timeMage from "./timeMage";

// Pronunciation
import portalCustodian from "./portalCustodian";

// Letter-based
import longbowman from "./longbowman";
import arbalester from "./arbalester";
import siegeEngineer from "./siegeEngineer";
import lineOperator from "./lineOperator";
import walkingRolodex from "./walkingRolodex";
import shouter from "./shouter";
import whisperer from "./whisperer";
import chopper from "./chopper";
import pinballWizard from "./pinballWizard";
import hipster from "./hipster";
import politician from "./politician";
import angryUberDriver from "./angryUberDriver";
import yodeler from "./yodeler";
import createGangster from "./gangster";
import darkestEcho from "./darkestEcho";
import glubber from "./glubber";

// Word length
import threeArmedWorker from "./threeArmedWorker";
import threeEyedAssistant from "./threeEyedAssistant";
import fourArmedWorker from "./fourArmedWorker";
import fourEyedAssistant from "./fourEyedAssistant";
import fiveArmedWorker from "./fiveArmedWorker";
import fiveEyedAssistant from "./fiveEyedAssistant";
import manyArmedWorker from "./manyArmedWorker";
import manyEyedAssistant from "./manyEyedAssistant";
import trimurti from "./trimurti";
import fourHorsemen from "./fourHorsemen";
import fiveDeities from "./fiveDeities";
import pantheon from "./pantheon";

// Word pattern
import translator from "./translator";
import backToBackDuo from "./backToBackDuo";
import faceToFaceTalkers from "./faceToFaceTalkers";
import mixer from "./mixer";
import dodgeballChampion from "./dodgeballChampion";
import scratcher from "./scratcher";
import congaLine from "./congaLine";
import kingRuler from "./kingRuler";
import creditAgency from "./creditAgency";
import defenseMinister from "./defenseMinister";

// Stateful
import createClimber from "./climber";
import createBuilder from "./builder";
import createSharpshooter from "./sharpshooter";

// Economic
import gambler from "./gambler";
import oilTycoon from "./oilTycoon";
import dayTrader from "./dayTrader";
import createCryptoBro from "./cryptoBro";
import createPickpocket from "./pickpocket";
import investmentBanker from "./investmentBanker";
import middleManager from "./middleManager";
import superstarAthlete from "./superstarAthlete";

// Special
import createDragonOfNightMountain from "./dragonOfNightMountain";
import createAbyssalVoidTerror from "./abyssalVoidTerror";
import scholar from "./scholar";

/**
 * Creates a fresh array of all powerups.
 * Stateful powerups are instantiated via their factory functions,
 * so each call returns independent instances.
 */
export function createAllPowerups(): Powerup[] {
  return [
    // Parts of speech
    librarianOfItems,
    collectorOfActions,
    archivistOfDescriptions,
    hoarderOfMiscellanea,
    oldFortyNiner,
    illinoisJames,
    signoreDiBondone,
    leonardo,
    createDecathlete(),
    timeMage,
    // Pronunciation
    portalCustodian,
    // Letter-based
    longbowman,
    arbalester,
    siegeEngineer,
    lineOperator,
    walkingRolodex,
    shouter,
    whisperer,
    chopper,
    pinballWizard,
    hipster,
    politician,
    angryUberDriver,
    yodeler,
    createGangster(),
    darkestEcho,
    glubber,
    // Word length
    threeArmedWorker,
    threeEyedAssistant,
    fourArmedWorker,
    fourEyedAssistant,
    fiveArmedWorker,
    fiveEyedAssistant,
    manyArmedWorker,
    manyEyedAssistant,
    trimurti,
    fourHorsemen,
    fiveDeities,
    pantheon,
    // Word pattern
    translator,
    backToBackDuo,
    faceToFaceTalkers,
    mixer,
    dodgeballChampion,
    scratcher,
    congaLine,
    kingRuler,
    creditAgency,
    defenseMinister,
    // Stateful
    createClimber(),
    createBuilder(),
    createSharpshooter(),
    // Economic
    gambler,
    oilTycoon,
    dayTrader,
    createCryptoBro(),
    createPickpocket(),
    investmentBanker,
    middleManager,
    superstarAthlete,
    // Special
    createDragonOfNightMountain(),
    createAbyssalVoidTerror(),
    scholar,
  ];
}

/**
 * Factories for the powerups that accumulate state, keyed by name so a saved
 * run can rebuild one with its bonus intact.
 */
const STATEFUL_FACTORIES: Record<string, (saved?: PowerupState) => Powerup> = {
  "The Gangster": createGangster,
  "The Climber": createClimber,
  "The Builder": createBuilder,
  "The Sharpshooter": createSharpshooter,
  "The Crypto Bro": createCryptoBro,
  "The Pickpocket": createPickpocket,
  "Dragon of Night Mountain": createDragonOfNightMountain,
  "Abyssal Void Terror": createAbyssalVoidTerror,
  Decathlete: createDecathlete,
};

let statelessByName: Map<string, Powerup> | null = null;

/**
 * Rebuilds a single powerup by name, restoring accumulated state where the
 * powerup has any. Returns null for a name the registry no longer knows,
 * which is how a save referencing a deleted powerup gets rejected.
 */
export function createPowerup(
  name: string,
  saved?: PowerupState,
): Powerup | null {
  const factory = STATEFUL_FACTORIES[name];
  if (factory) return factory(saved);

  if (!statelessByName) {
    statelessByName = new Map(
      createAllPowerups()
        .filter((p) => !(p.name in STATEFUL_FACTORIES))
        .map((p) => [p.name, p]),
    );
  }
  return statelessByName.get(name) ?? null;
}
