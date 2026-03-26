import user from "#database/users.js";
import { buyCommand } from "#slashyInformations/buy.js";
import { FOOD_CONFIG } from "#utils/config/food.config.js";
import { MEDICINE_CONFIG } from "#utils/config/medicine.config.js";
import { TOY_CONFIG } from "#utils/config/toy.config.js";
import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof buyCommand> {
  public override async chatInput(
    interaction: InteractionParam,
    args: ArgsParam<typeof buyCommand>,
  ): Promise<void> {
    const guildID = interaction.guildId;
    const userID = interaction.user.id;
    const database = await user.findOne({ userID, guildID });

    if (!database) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.user_not_found", {
          lng: interaction.locale,
        }),
      );
      return;
    }

    const action = interaction.options.getSubcommand();

    switch (action) {
      case "food": {
        const itemType = args.food.itemname as keyof typeof FOOD_CONFIG;
        const quantity = args.food.quantity;

        const item = FOOD_CONFIG[itemType];

        if (!item) {
          await interaction.reply(
            i18next.t("command.utility.pet.error.item_not_found", {
              lng: interaction.locale,
            }),
          );
          return;
        }

        const totalPrice = item.price * quantity;

        if (database.coins < totalPrice) {
          await interaction.reply(
            i18next.t("command.utility.pet.error.not_enough_coins", {
              lng: interaction.locale,
            }),
          );
          return;
        }

        database.coins -= totalPrice;

        const inventory = database.pet?.inventory.food;

        const existingItem = inventory?.find((i) => i.type === itemType);

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          inventory?.push({
            itemName: itemType,
            type: itemType,
            quantity,
          });
        }

        await database.save();

        await interaction.reply(
          i18next.t("command.utility.pet.item_bought", {
            itemName: i18next.t(`shop.food.${itemType}`, {
              lng: interaction.locale,
            }),
            quantity,
            lng: interaction.locale,
          }),
        );

        break;
      }

      case "medicine": {
        const itemType = args.medicine.itemname as keyof typeof MEDICINE_CONFIG;
        const quantity = args.medicine.quantity;

        const item = MEDICINE_CONFIG[itemType];

        if (!item) {
          await interaction.reply(
            i18next.t("command.utility.pet.error.item_not_found", {
              lng: interaction.locale,
            }),
          );
          return;
        }

        const totalPrice = item.price * quantity;

        if (database.coins < totalPrice) {
          await interaction.reply(
            i18next.t("command.utility.pet.error.not_enough_coins", {
              lng: interaction.locale,
            }),
          );
          return;
        }

        database.coins -= totalPrice;

        const inventory = database.pet?.inventory.medicine;

        const existingItem = inventory?.find((i) => i.type === itemType);

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          inventory?.push({
            itemName: itemType,
            type: itemType,
            quantity,
          });
        }

        await database.save();

        await interaction.reply(
          i18next.t("command.utility.pet.item_bought", {
            itemName: i18next.t(`shop.medicine.${itemType}`, {
              lng: interaction.locale,
            }),
            quantity,
            lng: interaction.locale,
          }),
        );

        break;
      }
      case "toy": {
        const itemType = args.toy.itemname as keyof typeof TOY_CONFIG;
        const quantity = args.toy.quantity;

        const item = TOY_CONFIG[itemType];

        if (!item) {
          await interaction.reply(
            i18next.t("command.utility.pet.error.item_not_found", {
              lng: interaction.locale,
            }),
          );
          return;
        }

        const totalPrice = item.price * quantity;

        if (database.coins < totalPrice) {
          await interaction.reply(
            i18next.t("command.utility.pet.error.not_enough_coins", {
              lng: interaction.locale,
            }),
          );
          return;
        }

        database.coins -= totalPrice;

        const inventory = database.pet?.inventory.toys;

        const existingItem = inventory?.find((i) => i.type === itemType);

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          inventory?.push({
            itemName: itemType,
            type: itemType,
            quantity,
          });
        }

        await database.save();

        await interaction.reply(
          i18next.t("command.utility.pet.item_bought", {
            itemName: i18next.t(`shop.toy.${itemType}`, {
              lng: interaction.locale,
            }),
            quantity,
            lng: interaction.locale,
          }),
        );

        break;
      }
    }
  }
}
