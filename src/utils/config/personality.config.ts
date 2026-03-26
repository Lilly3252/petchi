import { PetPersonality } from "#utils/enums/personality.js";

export const PERSONALITY_CONFIG = {
  [PetPersonality.PLAYFUL]: {
    happinessMultiplier: 1.3,
    xpMultiplier: 1.1,
    hungerMultiplier: 1.2,
    healthMultiplier: 1.0,
  },
  [PetPersonality.LAZY]: {
    happinessMultiplier: 0.8,
    xpMultiplier: 0.7,
    hungerMultiplier: 0.8,
    healthMultiplier: 1.0,
  },
  [PetPersonality.AGGRESSIVE]: {
    happinessMultiplier: 1.0,
    xpMultiplier: 1.2,
    hungerMultiplier: 1.1,
    healthMultiplier: 0.9,
  },
  [PetPersonality.FRIENDLY]: {
    happinessMultiplier: 1.2,
    xpMultiplier: 1.0,
    hungerMultiplier: 1.0,
    healthMultiplier: 1.1,
  },
  [PetPersonality.CURIOUS]: {
    happinessMultiplier: 1.1,
    xpMultiplier: 1.3,
    hungerMultiplier: 1.2,
    healthMultiplier: 1.0,
  },
  [PetPersonality.NEUTRAL]: {
    happinessMultiplier: 1.0,
    xpMultiplier: 1.0,
    hungerMultiplier: 1.0,
    healthMultiplier: 1.0,
  },
} as const;

export type PersonalityType = keyof typeof PERSONALITY_CONFIG;