import { questCommand } from "#slashyInformations/quest.js";
import { QUEST_CONFIG } from "#utils/config/quest.config.js";
import { QuestType } from "#utils/enums/questType.js";
import { generateQuestObjects } from "#utils/functions/functions.js";
import { Command } from "@yuudachi/framework";
import { InteractionParam, ArgsParam } from "@yuudachi/framework/types";
import i18next from "i18next";
import user from "#database/users.js";

export default class extends Command<typeof questCommand> {
  public override async chatInput(
    interaction: InteractionParam,
    args: ArgsParam<typeof questCommand>,
  ): Promise<void> {
    const guildID = interaction.guildId;
    const userID = interaction.user.id;
    const database = await user.findOne({ userID, guildID });

    if (!database?.pet?.petName) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.no_pet", {
          lng: interaction.locale,
        }),
      );
      return;
    }

    const questType = args.questname as QuestType;
    const config = QUEST_CONFIG[questType];

    if (!config) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.quest_not_exist", {
          lng: interaction.locale,
        }),
      );
      return;
    }

    database.quests = database.quests || [];

    const userQuest = database.quests.find(
      (q) =>
        q.questName === i18next.t(config.nameKey, { lng: interaction.locale }),
    );

    if (userQuest) {
      if (userQuest.completed) {
        await interaction.reply(
          i18next.t("command.utility.pet.error.quest_completed", {
            lng: interaction.locale,
          }),
        );
        return;
      }

      if (userQuest.expiryDate && new Date() > userQuest.expiryDate) {
        await interaction.reply(
          i18next.t("command.utility.pet.error.quest_expired", {
            lng: interaction.locale,
          }),
        );
        return;
      }

      userQuest.progress = (userQuest.progress || 0) + 10;
      if (userQuest.progress >= 100) {
        userQuest.completed = true;
        await database.save();
        await interaction.reply(
          i18next.t("command.utility.pet.quest.completed", {
            questName: userQuest.questName,
            reward: userQuest.reward,
            lng: interaction.locale,
          }),
        );
        return;
      } else {
        await database.save();
        await interaction.reply(
          i18next.t("command.utility.pet.quest.progress", {
            questName: userQuest.questName,
            progress: userQuest.progress,
            lng: interaction.locale,
          }),
        );
        return;
      }
    }

    const newQuest = generateQuestObjects(interaction.locale).find(
      (q) =>
        q.questName === i18next.t(config.nameKey, { lng: interaction.locale }),
    );

    if (!newQuest) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.quest_not_exist", {
          lng: interaction.locale,
        }),
      );
      return;
    }
    const questToAdd = {
      questName: newQuest.questName,
      reward: newQuest.reward,
      expiryDate: newQuest.expiryDate!,
      progress: newQuest.progress ?? 0,
      completed: newQuest.completed ?? false,
    };
    database.quests.push(questToAdd);
    await database.save();
    await interaction.reply(
      i18next.t("command.utility.pet.quest.started", {
        questName: newQuest.questName,
        lng: interaction.locale,
      }),
    );
  }
}
