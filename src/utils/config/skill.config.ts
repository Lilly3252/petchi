import { availablePetsType } from "#utils/enums/animalType.js";
import { petSkills } from "#utils/enums/skillsType.js";
import { SkillConfig } from "#utils/types/skillsInterface.js";

export const SKILLS_CONFIG: Record<petSkills, SkillConfig> = {
  [petSkills.FETCH]: {
    bondGain: 5.5,
    cooldown: 60000,
    xpGain:0,
    socialEffect: 10,
    funFactor: 3.5,
    indoorOnly: false,
    outdoorOnly: true,
    petTypeRestriction: [availablePetsType.DOG, availablePetsType.CAT],
  },
  [petSkills.ROLL_OVER]: {
    bondGain: 0,
    cooldown: 60000,
    xpGain:0,
    socialEffect: 0,
    funFactor: 0,
    indoorOnly: false,
    outdoorOnly: false,
    petTypeRestriction: [],
  },
  [petSkills.SIT]: {
    bondGain: 0,
    cooldown: 60000,
    xpGain:0,
    socialEffect: 0,
    funFactor: 0,
    indoorOnly: false,
    outdoorOnly: false,
    petTypeRestriction: [],
  },
  [petSkills.SPEAK]: {
    bondGain: 0,
    cooldown: 60000,
    xpGain:0,
    socialEffect: 0,
    funFactor: 0,
    indoorOnly: false,
    outdoorOnly: false,
    petTypeRestriction: [],
  },
};
