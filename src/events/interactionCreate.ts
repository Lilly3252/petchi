import { getLanguage } from "#utils/functions/functions.js";
import { inject, injectable } from "@needle-di/core";
import type { Command } from "@yuudachi/framework";
import {
  transformApplicationInteraction,
  logger,
  kCommands,
} from "@yuudachi/framework";
import type { Event, InteractionParam } from "@yuudachi/framework/types";
import {
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Client,
  Events,
  Interaction,
} from "discord.js";

@injectable()
export default class implements Event {
  public name = "Interaction handling";

  public event = Events.InteractionCreate as const;

  public constructor(
    public readonly client: Client<true> = inject(Client),
    public readonly commands: Map<string, Command> = inject(kCommands),
  ) {}

  public execute(): void {
    this.client.on(this.event, async (interaction) => {
      if (
        !interaction.isCommand() &&
        !interaction.isUserContextMenuCommand() &&
        !interaction.isMessageContextMenuCommand() &&
        !interaction.isAutocomplete()
      ) {
        return;
      }

      if (!interaction.inCachedGuild()) {
        return;
      }
      const command = this.commands.get(interaction.commandName.toLowerCase());
      const locale = "en-US";
      const effectiveLocale = locale ?? interaction.locale;
      switch (interaction.commandType) {
        case ApplicationCommandType.ChatInput: {
          const isAutocomplete = interaction.isAutocomplete();
          if (isAutocomplete) {
            await command?.autocomplete(
              interaction,
              transformApplicationInteraction(interaction.options.data),
              effectiveLocale,
            );
            break;
          } else {
            await interaction.deferReply({
              ephemeral: interaction.options.getBoolean("hide") ?? true,
            });
            const command = this.commands.get(interaction.commandName);

            logger.info(
              {
                command: {
                  name: interaction.commandName,
                  type: interaction.type,
                },
                userId: interaction.user.id,
              },
              `Executing ${interaction.isAutocomplete() ? "autocomplete" : "chatInput command"} ${interaction.commandName}`,
            );
            const defaultLanguage =
              (interaction.options.getBoolean("hide") ?? true)
                ? undefined
                : "en-US";
            const locale = getLanguage(interaction, defaultLanguage);

            await command?.chatInput(
              interaction,
              transformApplicationInteraction(interaction.options.data),
              locale!,
            );
          }
          break;
        }
      }
    });
  }
}
