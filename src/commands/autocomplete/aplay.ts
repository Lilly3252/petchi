import user from "#database/models/users.js";
import { buildAutocomplete } from "#utils/index.js";
import { CommandMethod, InteractionParam } from "@yuudachi/framework/types";
export async function aplay(
  interaction: InteractionParam<CommandMethod.Autocomplete>,
  guildID: string,
  userID: string,
): Promise<void> {
  const database = await user.findOne({ userID, guildID });

  const input = interaction.options.getFocused() as string;

  const choices = buildAutocomplete(
    database?.pet?.inventory?.toys,
    input,
  );

  await interaction.respond(choices);
}
