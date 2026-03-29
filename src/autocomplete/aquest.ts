import user from "#database/models/users.js";
import { generateQuestObjects } from "#utils/quests.js";
import { CommandMethod, InteractionParam } from "@yuudachi/framework/types";

/**
 * Handles the autocomplete interaction for quests.
 *
 * @param interaction - The interaction object from Discord
 * @param guildID - The ID of the guild where the command was issued
 * @param userID - The ID of the user who issued the command
 * @returns Promise<void>
 */

export async function aquest(
  interaction: InteractionParam<CommandMethod.Autocomplete>,
  guildID: string,
  userID: string,
): Promise<void> {
  const database = await user.findOne({ userID, guildID });

  // If user has incomplete quests, show those first
  if (database?.quests?.length) {
    const incompleteQuests = database.quests.filter((q) => !q.completed);

    if (incompleteQuests.length > 0) {
      await interaction.respond(
        incompleteQuests.map((q) => ({
          name: q.questName,
          value: q.questName,
        })),
      );
      return;
    }
  }

  // Otherwise, show all quests from config
  const locale = interaction.locale;
  const allQuests = generateQuestObjects(locale);

  await interaction.respond(
    allQuests.map((q) => ({
      name: q.questName,
      value: q.questName,
    })),
  );
}