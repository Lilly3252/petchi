import { availablePetsType } from "#utils/enums/animalType.js";
import { petSkills } from "#utils/enums/skillsType.js";

export type SkillConfig = {
  bondGain?: number;
  xpGain: number
  cooldown: number;
  socialEffect?: number;
  funFactor?: number;
  indoorOnly: boolean;
  outdoorOnly: boolean;
  petTypeRestriction?: availablePetsType[];
};