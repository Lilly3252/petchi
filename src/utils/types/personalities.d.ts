export interface PersonalityConfig {
  happinessMultiplier: number;
  xpMultiplier: number;
  hungerMultiplier: number;
  healthMultiplier: number;
  learnChanceMultiplier: number; // affects skill learning
  stubbornness: number; // chance to refuse action (0–1)
  bonusSkillChance: number; // chance to get extra XP
}
