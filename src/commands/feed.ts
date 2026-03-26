import user from "#database/users.js";
import { feedCommand } from "#slashyInformations/feed.js";
import { FOOD_CONFIG } from "#utils/config/food.config.js";
import {
  PERSONALITY_CONFIG,
  PersonalityType,
} from "#utils/config/personality.config.js";
import { FoodType } from "#utils/enums/foodType.js";
import { getPersonalityConfig } from "#utils/functions/functions.js";
import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof feedCommand> {
  public override async chatInput(
    interaction: InteractionParam,
    args: ArgsParam<typeof feedCommand>,
  ): Promise<void> {
    const guildID = interaction.guildId;
    const userID = interaction.user.id;
    const database = await user.findOne({ userID, guildID });
    const itemType = args.itemname as FoodType;

    if (!database?.pet?.petName) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.no_pet", {
          lng: interaction.locale,
        }),
      );
      return;
    }
    const food = FOOD_CONFIG[itemType];

    if (!food) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.item_not_found", {
          lng: interaction.locale,
        }),
      );
      return;
    }
    const inventoryItem = database.pet.inventory.food.find(
      (f) => f.itemName === itemType,
    );

    if (!inventoryItem || inventoryItem.quantity <= 0) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.no_item", {
          lng: interaction.locale,
        }),
      );
      return;
    }
    const personality = getPersonalityConfig(database.pet);

    const hungerGain = Math.floor(food.hunger * personality.hungerMultiplier);

    database.pet.hunger = Math.min(database.pet.hunger + hungerGain, 100);

    const healthGain = Math.floor(food.health * personality.healthMultiplier);

    database.pet.hunger = Math.min(database.pet.hunger + hungerGain, 100);

    database.pet.health = Math.min(database.pet.health + healthGain, 100);
    
    inventoryItem.quantity -= 1;

    await database.save();

    await interaction.reply(
      i18next.t("command.utility.pet.fed_pet", {
        itemName: i18next.t(`shop.food.${itemType}`, {
          lng: interaction.locale,
        }),
        hunger: database.pet.hunger,
        health: database.pet.health,
        lng: interaction.locale,
      }),
    );
  }
}
