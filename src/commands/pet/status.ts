import user from "#database/users.js";
import { statusCommand } from "#slashyInformations/status.js";
import { createBar, getMoodEmoji, getPetCondition } from "#utils/functions/functions.js";
import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";
import { injectable } from "tsyringe";

@injectable()
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
        const skillsDisplay = formatSkills(
          pet.skills,
          pet.skillXP,
          interaction.locale,
        );
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

            skills: skillsDisplay,

            lng: interaction.locale,
          }),
        );

        function formatSkills(
          skills: string[],
          skillXP: Record<string, number> | undefined,
          locale: string,
        ): string {
          if (!skills.length) return "None";

          return skills
            .map((skill) => {
              const name = i18next.t(`skills.${skill}`, { lng: locale });
              const xp = skillXP?.[skill] ?? 0;
              return `• ${name} (${xp} XP)`;
            })
            .join("\n");
        }
      }
    }
  
