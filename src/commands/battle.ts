import user from "#database/users.js";
import { adoptCommand } from "#slashyInformations/adopt.js";
import { battleCommand } from "#slashyInformations/battle.js";

import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

function calculatePower(pet: any): number {
  // 🔥 scalable formula
  return pet.level * 2 + pet.skills.length * 5 + Math.floor(Math.random() * 10);
}

function applyDamage(current: number, damage: number): number {
  return Math.max(current - damage, 0);
}

export default class extends Command<typeof battleCommand> {
  public override async chatInput(
    interaction: InteractionParam,
    args: ArgsParam<typeof adoptCommand>,
  ): Promise<void> {
    const guildID = interaction.guildId;
    const userID = interaction.user.id;
    const [database, opponent_database] = await Promise.all([
      user.findOne({ userID, guildID }),
      user.findOne({ userID: opponentID, guildID }),
    ]);

    if (!database?.pet?.petName || !opponent_database?.pet?.petName) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.battle_required", {
          lng: interaction.locale,
        }),
      );
      return;
    }

    const userPower = calculatePower(database.pet);
    const opponentPower = calculatePower(opponent_database.pet);

    let resultKey: string;

    if (userPower > opponentPower) {
      database.pet.health = applyDamage(database.pet.health, 10);
      opponent_database.pet.health = applyDamage(
        opponent_database.pet.health,
        20,
      );
      resultKey = "win";
    } else if (userPower < opponentPower) {
      database.pet.health = applyDamage(database.pet.health, 20);
      opponent_database.pet.health = applyDamage(
        opponent_database.pet.health,
        10,
      );
      resultKey = "lose";
    } else {
      database.pet.health = applyDamage(database.pet.health, 15);
      opponent_database.pet.health = applyDamage(
        opponent_database.pet.health,
        15,
      );
      resultKey = "tie";
    }

    // ✅ Save once
    await Promise.all([database.save(), opponent_database.save()]);

    await interaction.reply(
      i18next.t(`command.utility.pet.battle.${resultKey}`, {
        userPetName: database.pet.petName,
        opponentPetName: opponent_database.pet.petName,
        lng: interaction.locale,
      }),
    );
  }
}
