import { dailyCommand } from "#slashyInformations/daily.js";
import { playCommand } from "#slashyInformations/play.js";
import { Command } from "@yuudachi/framework";
import { InteractionParam, ArgsParam } from "@yuudachi/framework/types";
import i18next from "i18next";
import user from "#database/users.js";

const DAILY_COOLDOWN = 24 * 60 * 60 * 1000; // 24h
const DAILY_REWARD = 50;

export default class extends Command<typeof dailyCommand> {
  public override async chatInput(
    interaction: InteractionParam,
    args: ArgsParam<typeof playCommand>,
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

    const now = Date.now();
    const lastDaily = database.lastDaily?.getTime() ?? 0;

    const timeSinceLast = now - lastDaily;

    // ❌ Still on cooldown
    if (timeSinceLast < DAILY_COOLDOWN) {
      const remaining = DAILY_COOLDOWN - timeSinceLast;

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

      await interaction.reply(
        i18next.t("command.utility.pet.error.daily_claimed", {
          hours,
          minutes,
          lng: interaction.locale,
        }),
      );
      return;
    }

    // ✅ Give reward
    database.coins += DAILY_REWARD;
    database.lastDaily = new Date();

    await database.save();

    await interaction.reply(
      i18next.t("command.utility.pet.daily_reward", {
        dailyReward: DAILY_REWARD,
        lng: interaction.locale,
      }),
    );
  }
}
