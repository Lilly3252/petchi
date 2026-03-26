import user from "#database/users.js";
import { adoptCommand } from "#slashyInformations/adopt.js";
import { ANIMAL_CONFIG } from "#utils/config/animal.config.js";
import { availablePetsType } from "#utils/enums/animalType.js";
import { PetPersonality } from "#utils/enums/personality.js";
import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof adoptCommand> {
  public override async chatInput(
    interaction: InteractionParam,
    args: ArgsParam<typeof adoptCommand>,
  ): Promise<void> {
    const guildID = interaction.guildId;
    const userID = interaction.user.id;
    const database = await user.findOne({ userID, guildID });

    const petName = args.petname;
    const petType = args.pettype as availablePetsType;

    if (!petName || !petType) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.provide_both", {
          lng: interaction.locale,
        }),
      );
      return;
    }

    const selectedPet = ANIMAL_CONFIG[petType];

    if (!selectedPet) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.invalid_pet_type", {
          lng: interaction.locale,
        }),
      );
      return;
    }
    const personalities = Object.values(PetPersonality);
    const randomPersonality =
      personalities[Math.floor(Math.random() * personalities.length)];

    if (database?.pet?.petName) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.already_have_pet", {
          lng: interaction.locale,
        }),
      );
      return;
    }

    await user.findOneAndUpdate(
      { userID, guildID },
      {
        pet: {
          petName,
          petType,
          personality: randomPersonality,
          hunger: selectedPet.defaultHunger,
          happiness: selectedPet.defaultHappiness,
          health: selectedPet.defaultHealth,
          lastFed: new Date(),
          lastPlayed: new Date(),
          skills: [],
        },
      },
      { upsert: true, new: true },
    );

    await interaction.reply(
      i18next.t("command.utility.pet.adopt.success", {
        petType,
        petName,
        lng: interaction.locale,
      }),
    );
  }
}
