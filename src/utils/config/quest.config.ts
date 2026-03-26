import { QuestType } from "#utils/enums/questType.js";
import { QuestConfig } from "#utils/types/questInterfaces.js";

export const QUEST_CONFIG: Record<QuestType, QuestConfig> = {
  [QuestType.FEED_PET]: {
    nameKey:"command.utility.pet.quest.quest_name.feed_pet",
    descriptionKey: "command.utility.pet.quest.quest_description.feed_pet",
    reward: "50 XP",
    expiryMs: 24 * 60 * 60 * 1000, // 1 day
    progress: 0,
    completed: false,
  },
  [QuestType.TRAIN_PET]: {
    nameKey:"command.utility.pet.quest.quest_name.train_pet",
    descriptionKey: "command.utility.pet.quest.quest_description.train_pet",
    reward: "200 XP",
    expiryMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    progress: 0,
    completed: false,
  },
  [QuestType.PET_SHOW]: {
    nameKey:"command.utility.pet.quest.quest_name.pet_show",
    descriptionKey: "command.utility.pet.quest.quest_description.pet_show",
    reward: "500 XP",
    expiryDate: new Date("2024-12-25"),
    progress: 0,
    completed: false,
  },
  [QuestType.WALK_PET]: {
    nameKey:"command.utility.pet.quest.quest_name.walk_pet",
    descriptionKey: "command.utility.pet.quest.quest_description.walk_pet",
    reward: "30 XP",
    expiryMs: 48 * 60 * 60 * 1000,
    progress: 0,
    completed: false,
  },
  [QuestType.PLAY_FETCH]: {
    nameKey:"command.utility.pet.quest.quest_name.play_fetch_pet",
    descriptionKey: "command.utility.pet.quest.quest_description.play_fetch_pet",
    reward: "100 XP",
    expiryMs: 72 * 60 * 60 * 1000,
    progress: 0,
    completed: false,
  },
  [QuestType.VISIT_VET]: {
    nameKey:"command.utility.pet.quest.quest_name.visit_the_vet",
    descriptionKey: "command.utility.pet.quest.quest_description.visit_the_vet",
    reward: "150 XP and a health boost",
    expiryMs: 5 * 24 * 60 * 60 * 1000,
    progress: 0,
    completed: false,
  },
  [QuestType.TEACH_TRICK]: {
    nameKey:"command.utility.pet.quest.quest_name.teach_pet_trick",
    descriptionKey: "command.utility.pet.quest.quest_description.teach_pet_trick",
    reward: "250 XP",
    expiryMs: 10 * 24 * 60 * 60 * 1000,
    progress: 0,
    completed: false,
  },
  [QuestType.COSTUME_CONTEST]: {
    nameKey:"command.utility.pet.quest.quest_name.pet_costume_contest",
    descriptionKey: "command.utility.pet.quest.quest_description.pet_costume_contest",
    reward: "300 XP",
    expiryDate: new Date("2024-10-31"),
    progress: 0,
    completed: false,
  },
  [QuestType.SPA_DAY]: {
    nameKey:"command.utility.pet.quest.quest_name.pet_spa_day",
    descriptionKey: "command.utility.pet.quest.quest_description.pet_spa_day",
    reward: "100 XP and improved happiness",
    expiryMs: 3 * 24 * 60 * 60 * 1000,
    progress: 0,
    completed: false,
  },
};
