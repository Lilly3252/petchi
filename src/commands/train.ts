import user from "#database/users.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

import {
  PET_SKILLS,
  isSkillName,
  SkillName,
} from "#utils/config/skill.config.js";
import { trainCommand } from "#slashyInformations/train.js";
import { Command } from "@yuudachi/framework";

export default class extends Command<typeof trainCommand> {
  public override async chatInput(
    interaction: InteractionParam,
    args: ArgsParam<typeof trainCommand>,
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

    const skillInput = args.skill;

    if (!isSkillName(skillInput)) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.skill_invalid", {
          skill: skillInput,
          lng: interaction.locale,
        }),
      );
      return;
    }

    const skillName: SkillName = skillInput;

    const pet = database.pet;

    pet.skills = pet.skills || [];
    pet.skillXP = pet.skillXP || {};

    if (!pet.skillXP[skillName]) {
      pet.skillXP[skillName] = 0;
    }

    const skillConfig = PET_SKILLS[skillName];

    let messageKey: string;

    if (!pet.skills.includes(skillName)) {
      pet.skills.push(skillName);
      messageKey = "command.utility.pet.skill_learned";
    } else {
      messageKey = "command.utility.pet.skill_trained";
    }

    
    pet.skillXP[skillName] += skillConfig.xpGain;

   
    pet.happiness = Math.min(pet.happiness + skillConfig.happinessGain, 100);

    if (pet.skillXP[skillName] >= 100) {
      pet.level += 1;
      pet.skillXP[skillName] = 0;
    }

    await database.save();

    await interaction.reply(
      i18next.t(messageKey, {
        skill: skillName,
        xp: pet.skillXP[skillName],
        level: pet.level,
        happiness: pet.happiness,
        lng: interaction.locale,
      }),
    );
  }
}
