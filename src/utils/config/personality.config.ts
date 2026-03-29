import { PetPersonality } from "#utils/enums/personality.js";
import { PersonalityConfig } from "#utils/types/personalities.js";

export const PERSONALITY_CONFIG: Record<PetPersonality, PersonalityConfig> = {
  [PetPersonality.PLAYFUL]: {
    happinessMultiplier: 1.3,
    xpMultiplier: 1.1,
    hungerMultiplier: 1.2,
    healthMultiplier: 1.0,
    learnChanceMultiplier: 1.2,
    stubbornness: 0.05,
    bonusSkillChance: 0.15,
  },
  [PetPersonality.LAZY]: {
    happinessMultiplier: 0.8,
    xpMultiplier: 0.7,
    hungerMultiplier: 0.8,
    healthMultiplier: 1.0,
    learnChanceMultiplier: 0.7,
    stubbornness: 0.25,
    bonusSkillChance: 0.05,
  },
  [PetPersonality.AGGRESSIVE]: {
    happinessMultiplier: 1.0,
    xpMultiplier: 1.2,
    hungerMultiplier: 1.1,
    healthMultiplier: 0.9,
    learnChanceMultiplier: 0.9,
    stubbornness: 0.2,
    bonusSkillChance: 0.2,
  },
  [PetPersonality.FRIENDLY]: {
    happinessMultiplier: 1.2,
    xpMultiplier: 1.0,
    hungerMultiplier: 1.0,
    healthMultiplier: 1.1,
    learnChanceMultiplier: 1.3,
    stubbornness: 0.05,
    bonusSkillChance: 0.1,
  },
  [PetPersonality.CURIOUS]: {
    happinessMultiplier: 1.1,
    xpMultiplier: 1.3,
    hungerMultiplier: 1.2,
    healthMultiplier: 1.0,
    learnChanceMultiplier: 1.4,
    stubbornness: 0.1,
    bonusSkillChance: 0.25,
  },
  [PetPersonality.NEUTRAL]: {
    happinessMultiplier: 1.0,
    xpMultiplier: 1.0,
    hungerMultiplier: 1.0,
    healthMultiplier: 1.0,
    learnChanceMultiplier: 1.0,
    stubbornness: 0.1,
    bonusSkillChance: 0.1,
  },
};

export type PersonalityType = keyof typeof PERSONALITY_CONFIG;
