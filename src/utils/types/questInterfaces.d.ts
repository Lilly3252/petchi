export interface Quest {
  questName: string;       // Display name (i18next )
  description: string;     // Description (i18next )
  reward: string;
  expiryDate?: Date;       // Optional
  progress?: number;       // 0-100
  completed: boolean;
}
// Internal config for your bot
export interface QuestConfig {
  nameKey: string;              // i18next key
  descriptionKey: string;       // i18next key for description
  reward: string;
  expiryDate?: Date;            // Fixed expiry
  expiryMs?: number;            // Or relative expiry in milliseconds
  progress?: number;            // Default 0
  completed: boolean;          // Default false
}