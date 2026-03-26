export const PET_SKILLS = {
  fetch: { xpGain: 20, happinessGain: 5 },
  roll_over: { xpGain: 15, happinessGain: 3 },
  sit: { xpGain: 10, happinessGain: 2 },
  speak: { xpGain: 25, happinessGain: 5 },
} as const;


export type SkillName = keyof typeof PET_SKILLS;


export function isSkillName(value: string): value is SkillName {
  return value in PET_SKILLS;
}