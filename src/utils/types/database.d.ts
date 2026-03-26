import { FoodType } from "#utils/enums/foodType.js";
import { MedicineType } from "#utils/enums/medecineType.js";
import { ToyType } from "#utils/enums/toyType.js";
import { Snowflake } from "discord.js";
import { Document, Types } from "mongoose";

export interface user {
  guildID: string;
  userID: Snowflake;
  blacklisted: boolean;
  pet?: {
    petName: string;
    petType: string;
    hunger: number;
    happiness: number;
    health: number;
    lastFed: Date;
    lastPlayed: Date;
    level: number;
    experience: number;
    skills: string[];
    skillXP?: Record<string, number>;
    personality?: PersonalityType;
    inventory: {
      medicine: Array<{
        itemName: string;
        quantity: number;
        type: MedicineType;
      }>;
      toys: Array<{
        itemName: string;
        quantity: number;
        type: ToyType;
      }>;
      food: Array<{
        itemName: string;
        quantity: number;
        type: FoodType;
      }>;
    };
  };
  coins: number;
  lastDaily: Date;
  quests?: Array<{
    questName: string;
    completed: boolean;
    progress: number;
    reward: string;
    expiryDate: Date;
  }>;
}
