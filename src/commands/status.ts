import user from "#database/users.js";
import { statusCommand } from "#slashyInformations/status.js";
import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

// Progress bar helper
function createBar(value: number, max = 100, size = 10): string {
  const filled = Math.round((value / max) * size);
  const empty = size - filled;
  return "🟩".repeat(filled) + "⬜".repeat(empty);
}

// Mood emoji based on happiness
function getMoodEmoji(happiness: number): string {
  if (happiness > 80) return "😄";
  if (happiness > 50) return "🙂";
  if (happiness > 20) return "😐";
  return "😢";
}

// Pet condition based on health, hunger, happiness
function getPetCondition(pet: {
  health: number;
  hunger: number;
  happiness: number;
}): string {
  if (pet.health < 30) return "⚠️ Critical";
  if (pet.hunger < 30) return "🍽️ Hungry";
  if (pet.happiness < 30) return "😔 Sad";
  return "✅ Good";
}

export default class extends Command<typeof statusCommand> {
  public override async chatInput(
    interaction: InteractionParam,
    args: ArgsParam<typeof statusCommand>,
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

    const pet = database.pet;

    await interaction.reply(
      i18next.t("command.utility.pet.status", {
        petName: pet.petName,
        petType: pet.petType,

        hunger: `${pet.hunger} (${createBar(pet.hunger)})`,
        happiness: `${pet.happiness} (${createBar(pet.happiness)}) ${getMoodEmoji(pet.happiness)}`,
        health: `${pet.health} (${createBar(pet.health)})`,

        level: pet.level,
        xp: pet.experience,
        condition: getPetCondition(pet),

        lng: interaction.locale,
      }),
    );
  }
}
