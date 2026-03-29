import { trainCommand } from "#slashyInformations/train.js";
import { SKILLS_CONFIG } from "#utils/config/skill.config.js";
import { petSkills } from "#utils/enums/skillsType.js";
import { isPetSkill, tSkill } from "#utils/functions/functions.js";
import { Command } from "@yuudachi/framework";
import { InteractionParam, ArgsParam } from "@yuudachi/framework/types";
import i18next from "i18next";
import user from "#database/users.js";
import { injectable } from "tsyringe";

@injectable()
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

    // ✅ Validate skill
    if (!isPetSkill(skillInput)) {
      await interaction.reply(
        i18next.t("command.utility.pet.error.skill_invalid", {
          skill: skillInput,
          lng: interaction.locale,
        }),
      );
      return;
    }

    const skillName = skillInput as petSkills;
    const skillConfig = SKILLS_CONFIG[skillName];

    const pet = database.pet;

    // ✅ Init
    pet.skills = pet.skills || [];
    pet.skillXP = pet.skillXP || ({} as Record<petSkills, number>);

    if (!pet.skillXP[skillName]) {
      pet.skillXP[skillName] = 0;
    }

    let messageKey: string;

    // 🎓 Learn vs Train
    if (!pet.skills.includes(skillName)) {
      pet.skills.push(skillName);
      messageKey = "command.utility.pet.skill_learned";
    } else {
      messageKey = "command.utility.pet.skill_trained";
    }

    // 🎯 Apply XP
    pet.skillXP[skillName] += skillConfig.xpGain;

    // 😊 Happiness
    pet.happiness = Math.min(pet.happiness + (skillConfig.funFactor ?? 0), 100);

    // ⬆️ Level up
    if (pet.skillXP[skillName] >= 100) {
      pet.level += 1;
      pet.skillXP[skillName] = 0;
    }

    await database.save();

    await interaction.reply(
      i18next.t(messageKey, {
        skill: tSkill(skillName, interaction.locale),
        xp: pet.skillXP[skillName],
        level: pet.level,
        happiness: pet.happiness,
        lng: interaction.locale,
      }),
    );
  }
}
