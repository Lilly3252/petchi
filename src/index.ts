console.log("🚀 index file started");

import "reflect-metadata";
import { createClient, container, commandInfo, dynamicImport, kCommands, Command, createCommands } from "@yuudachi/framework";
import { GatewayIntentBits, Partials } from "discord.js";
import readdirp from "readdirp";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { Event } from "@yuudachi/framework/types";
import { initI18n } from "#utils/i18n.js";
await initI18n();

const client = createClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.User,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember
  ]
});
createCommands();

const commands = container.get<Map<string, Command>>(kCommands);

const commandFiles = readdirp(fileURLToPath(new URL("dist/commands", import.meta.url)), {
  fileFilter: "*.js"
});

for await (const file of commandFiles) {
  const cmdInfo = commandInfo(file.path);
  if (!cmdInfo) continue;

  const module = await dynamicImport<new () => Command>(() => import(pathToFileURL(file.fullPath).href));
  const commandInstance = container.get<Command>((await module()).default);

  if (commandInstance.name) {
    for (const name of commandInstance.name) {
      commands.set(name.toLowerCase(), commandInstance);
    }
  } else {
    commands.set(cmdInfo.name.toLowerCase(), commandInstance);
  }

  console.log(`✅ Loaded command: ${cmdInfo.name}`);
}

const eventFiles = readdirp(fileURLToPath(new URL("events", import.meta.url)), {
	fileFilter: (file) => file.basename.endsWith(".js"),
});

for await (const file of eventFiles) {
  const dynamic = dynamicImport<new () => Event>(async () => import(pathToFileURL(file.fullPath).href));
  const event_ = container.get<Event>((await dynamic()).default);

  if (event_.disabled) continue;

  
  void  event_.execute();
  console.log(`📌 Loaded event: ${event_.name}`);
}

console.log("🚀 Logging in...");
await client.login(process.env.TOKEN);
console.log("✅ Login promise resolved");

