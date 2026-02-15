import type { Powerup } from "@/types/powerups";

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
import createMe from "./me";

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
    createMe(),
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
