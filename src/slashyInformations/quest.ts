import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export const questCommand = { // pingCommand / banCommand / settingCommand ... 
  name: "quest",
      description: "Start a quest",
      description_localizations: {
        fr: "Commencer une quête",
        ja: "クエストを開始する",
      },
      options: [
        {
          type: ApplicationCommandOptionType.Boolean,
          name: "new",
          description: "Is it a new quest?",
          description_localizations: {
            fr: "Est-ce une nouvelle quête?",
            ja: "新しいクエストですか？",
          },
          required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "questname",
          description: "The name of the quest",
          description_localizations: {
            fr: "Le nom de la quête",
            ja: "クエストの名前",
          },
          required: true,
          autocomplete: true,
        },
        {
          type: ApplicationCommandOptionType.Boolean,
          name: "hide",
          name_localizations: {
            fr: "masquer",
            ja: "非表示",
          },
          description: "Hides the output",
          description_localizations: {
            fr: "Masque(cacher) le résultat",
            ja: "出力を非表示にする",
          },
        },
      ],
  nsfw: false, 
  dm_permission:false, 
  default_member_permissions: "0",
} as const;
