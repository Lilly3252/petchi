import { buildAutocomplete } from "#utils/index.js";
import { CommandMethod, InteractionParam } from "@yuudachi/framework/types";
import user from "#database/models/users.js";
export async function acare(
  interaction: InteractionParam<CommandMethod.Autocomplete>,
  guildID: string,
  userID: string,
): Promise<void> {
  const database = await user.findOne({ userID, guildID });

  const input = interaction.options.getFocused() as string;

  const choices = buildAutocomplete(
    database?.pet?.inventory?.medicine,
    input,
  );

  await interaction.respond(choices);
}
