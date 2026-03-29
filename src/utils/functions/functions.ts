import user from "#database/users.js";
import { PERSONALITY_CONFIG, PersonalityType } from "#utils/config/personality.config.js";
import { QUEST_CONFIG } from "#utils/config/quest.config.js";
import { petSkills } from "#utils/enums/skillsType.js";
import { Pet } from "#utils/types/mainTypes.js";
import { Quest } from "#utils/types/questInterfaces.js";
import { InteractionParam } from "@yuudachi/framework/types";
import { GuildMember, Interaction, PermissionResolvable, Role } from "discord.js";
import i18next from "i18next";

/** * Checks if the user's pet has leveled up and updates its level and experience.
 *  @param userToCheck - The user whose pet's level is being checked.
 *  @param interaction - The interaction object to follow up the response. */
export async function checkLevelUp(
  userToCheck: InstanceType<typeof user>,
  interaction: InteractionParam
): Promise<void> {
  const xpToNextLevel = userToCheck.pet!.level * 100;
  if (userToCheck.pet!.experience >= xpToNextLevel) {
    userToCheck.pet!.level += 1;
    userToCheck.pet!.experience = 0;
    await userToCheck.save();
    await interaction.followUp(`Congratulations! Your pet has leveled up to level ${userToCheck.pet!.level}!`);
  }
}

export async function addUserBlacklist(member: GuildMember) {
  await user.create({
    guildID: member.guild.id,
    userID: member.id,
    blacklisted: true,
  });
  return addUserBlacklist;
}
/** * Checks if the given value is undefined.
 * @param value - The value to check.
 * @returns `true` if the value is undefined, otherwise `false`. */
export function isUndefined(value: unknown): boolean {
  return value === undefined;
}
/** * Determines the language to use based on the interaction's locale and a default language.
 * If the default language is undefined, it returns "en-US" or the interaction's locale if it is supported.
 * @param interaction - The interaction object containing locale information.
 * @param defaultLanguage - The default language to use if it is defined.
 * @returns The language to use for the interaction. */
export function getLanguage(interaction: Interaction, defaultLanguage: string | undefined) {
  if (isUndefined(defaultLanguage)) {
    const supportedLanguages = ["en-US", "fr", "ja"];
    return supportedLanguages.includes(interaction.locale) ? interaction.locale : "en-US";
  } else {
    return "en-US";
  }
}

export function isPetSkill(value: string): value is petSkills {
  return Object.values(petSkills).includes(value as petSkills);
}
export async function permission(
  interaction: InteractionParam,
  permission: PermissionResolvable,
  defaultLanguage: string | undefined
) {
  const language = defaultLanguage;
  const perms = interaction.guild.members.me?.permissions.has(permission);
  if (!perms && interaction.deferred) {
    await interaction.editReply({
      content: i18next.t("command.common.errors.permission_not_found", {
        perm: `${permission}`,
        lng: getLanguage(interaction, language),
      }),
    });
    return perms;
  } else {
    if (!perms && !interaction.deferred)
      await interaction.reply({
        content: i18next.t("command.common.errors.permission_not_found", {
          perm: `${permission}`,
          lng: getLanguage(interaction, language),
        }),
      });
  }
  return perms;
}

export function generateQuestObjects(locale: string): Quest[] {
  return Object.values(QUEST_CONFIG).map((config) => ({
    questName: i18next.t(config.nameKey, { lng: locale }),
    description: i18next.t(config.descriptionKey, { lng: locale }),
    reward: config.reward,
    expiryDate: config.expiryDate ?? new Date(Date.now() + (config.expiryMs ?? 0)),
    progress: config.progress ?? 0,
    completed: config.completed ?? false,
  }));
}
  // Pet condition based on health, hunger, happiness
   export  function getPetCondition(pet: {
      health: number;
      hunger: number;
      happiness: number;
    }): string {
      if (pet.health < 30) return "⚠️ Critical";
      if (pet.hunger < 30) return "🍽️ Hungry";
      if (pet.happiness < 30) return "😔 Sad";
      return "✅ Good";
    }
export function getPersonalityConfig(pet: Pet) {
  const personality: PersonalityType = pet.personality ?? "neutral";
  return PERSONALITY_CONFIG[personality];
}

export function applyDecay(pet: Pet):void {
  const now = Date.now();

  const hoursSinceFed =
    (now - new Date(pet.lastFed).getTime()) / (1000 * 60 * 60);

  const hoursSincePlayed =
    (now - new Date(pet.lastPlayed).getTime()) / (1000 * 60 * 60);

  const personality = getPersonalityConfig(pet);

  pet.hunger = Math.max(
    0,
    pet.hunger - hoursSinceFed * 5 * personality.hungerMultiplier,
  );

  pet.happiness = Math.max(
    0,
    pet.happiness - hoursSincePlayed * 3 * personality.happinessMultiplier,
  );

  if (pet.hunger < 20 || pet.happiness < 20) {
    pet.health = Math.max(0, pet.health - 2);
  }

  pet.lastFed = new Date();
  pet.lastPlayed = new Date();
}

export function tSkill(skill: petSkills, locale: string) {
  return i18next.t(`skills.${skill}`, { lng: locale });
}

    // Progress bar helper
    export function createBar(value: number, max = 100, size = 10): string {
      const filled = Math.round((value / max) * size);
      const empty = size - filled;
      return "🟩".repeat(filled) + "⬜".repeat(empty);
    }

    // Mood emoji based on happiness
    export function getMoodEmoji(happiness: number): string {
      if (happiness > 80) return "😄";
      if (happiness > 50) return "🙂";
      if (happiness > 20) return "😐";
      return "😢";
    }

  