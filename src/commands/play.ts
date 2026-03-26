import { playCommand } from "#slashyInformations/play.js";
import { PersonalityType, PERSONALITY_CONFIG } from "#utils/config/personality.config.js";
import { TOY_CONFIG } from "#utils/config/toy.config.js";
import { checkLevelUp, getPersonalityConfig } from "#utils/functions/functions.js";
import { Command } from "@yuudachi/framework";
import { InteractionParam, ArgsParam } from "@yuudachi/framework/types";
import i18next from "i18next";
import user from "#database/users.js";


export default class extends Command<typeof playCommand> {
  public override async chatInput(
    interaction: InteractionParam,
    args: ArgsParam<typeof playCommand>,
  ): Promise<void> {

  const guildID = interaction.guildId
  const userID = interaction.user.id
  const database = await user.findOne({ userID, guildID });

  const itemName = args.itemname;

  // ❌ No pet
  if (!database?.pet?.petName) {
    await interaction.reply(
      i18next.t("command.utility.pet.error.no_pet_play", {
        lng: interaction.locale,
      }),
    );
    return;
  }

  const pet = database.pet;

  // ❌ No toys
  if (!pet.inventory?.toys?.length) {
    await interaction.reply(
      i18next.t("command.utility.pet.error.no_toys", {
        lng: interaction.locale,
      }),
    );
    return;
  }

  // 🔍 Find toy in inventory
  const toy = pet.inventory.toys.find(
    (t) => t.itemName === itemName,
  );

  if (!toy || toy.quantity <= 0) {
    await interaction.reply(
      i18next.t("command.utility.pet.error.item_not_found", {
        lng: interaction.locale,
      }),
    );
    return;
  }

  // ✅ Get type safely
  const toyType = toy.type

  const config = TOY_CONFIG[toyType];

  if (!config) {
    await interaction.reply("Toy config not found");
    return;
  }

  // 🎮 Apply effects
 const baseFun = config.fun;

const personality = getPersonalityConfig(pet);

const happinessGain = Math.floor(baseFun * personality.happinessMultiplier);
const xpGain = Math.floor((baseFun / 2) * personality.xpMultiplier);
database.pet.happiness = Math.min(database.pet.happiness + happinessGain, 100);
database.pet.experience += xpGain;
  pet.lastPlayed = new Date();

  await checkLevelUp(database, interaction);
  await database.save();

  await interaction.reply(
    i18next.t("command.utility.pet.played_with_pet", {
      petName: pet.petName,
      itemName,
      happiness: pet.happiness,
      xp: pet.experience,
      lng: interaction.locale,
    }),
  );
}
}
