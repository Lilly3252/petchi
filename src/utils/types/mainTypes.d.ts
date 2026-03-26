export type RawCommandParam<M extends CommandMethod = CommandMethod.ChatInput> =
  InteractionParam<M, InteractionType.ApplicationCommand, Runtime.Raw, "raw">;
export type RawArgsParam<
  C extends CommandPayload,
  M extends CommandMethod = CommandMethod.ChatInput,
> = ArgsParam<C, M, InteractionType.ApplicationCommand, Runtime.Raw, "raw">;

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
    event: Collection<string, Event>;
  }
}

export type Pet = NonNullable<user["pet"]>;