import user from "#database/users.js";
import { careCommand } from "#slashyInformations/care.js";
import { MEDICINE_CONFIG } from "#utils/config/medicine.config.js";
import { MedicineType } from "#utils/enums/medecineType.js";
import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";
import { injectable } from "tsyringe";
@injectable()
export default class extends Command<typeof careCommand> {
  public override async chatInput(
    interaction: InteractionParam,
    args: ArgsParam<typeof careCommand>,
  ): Promise<void> {
    const guildID = interaction.guildId;
    const userID = interaction.user.id;
    const database = await user.findOne({ userID, guildID });

    const itemType = args.itemname as keyof typeof MEDICINE_CONFIG;

    if (!database?.pet?.petName) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.no_pet", {
          lng: interaction.locale,
        }),
      );
      return;
    }

    const item = MEDICINE_CONFIG[itemType];

    if (!item) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.item_not_found", {
          lng: interaction.locale,
        }),
      );
      return;
    }
    const inventoryItem = database.pet.inventory.medicine.find(
      (i) => i.itemName === itemType,
    );

    if (!inventoryItem || inventoryItem.quantity <= 0) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.no_item", {
          lng: interaction.locale,
        }),
      );
      return;
    }

    database.pet.health = Math.min(database.pet.health + item.health, 100);

    inventoryItem.quantity -= 1;

    const quest = database.quests?.find((q) => !q.completed);

    if (quest) {
      if (
        itemType === MedicineType.SPA_TREATMENT ||
        itemType === MedicineType.VET_VISIT
      ) {
        quest.progress = (quest.progress || 0) + 10;

        if (quest.progress >= 100) {
          quest.completed = true;

          await interaction.reply(
            i18next.t("command.utility.pet.quest.completed", {
              questName: quest.questName,
              reward: quest.reward,
              lng: interaction.locale,
            }),
          );
        } else {
          await interaction.reply(
            i18next.t("command.utility.pet.quest.progress", {
              progress: quest.progress,
              lng: interaction.locale,
            }),
          );
        }
      } else {
        await interaction.reply(
          i18next.t("command.utility.pet.used_item", {
            itemName: itemType,
            health: database.pet.health,
            lng: interaction.locale,
          }),
        );
      }
    } else {
      await interaction.reply(
        i18next.t("command.utility.pet.used_item", {
          itemName: itemType,
          health: database.pet.health,
          lng: interaction.locale,
        }),
      );
    }

    await database.save();
  }
}
