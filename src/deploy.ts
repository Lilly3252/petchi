import process from "node:process";
import * as command from "#slashyInformations/index.js";
import { Routes } from "discord-api-types/v10";
import { REST } from "@discordjs/rest";

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);
try {
  console.log("Start refreshing interaction (/) commands.");
  //console.log(command)
  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
    body: [],
  });

  console.log("Successfully reloaded interaction (/) commands.");
} catch (error) {
  console.error(error);
}
