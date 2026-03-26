import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const playCommand = {
  name: "play",
  description: "Play with your pet",
  description_localizations: {
    fr: "Jouer avec votre animal de compagnie",
    ja: "ペットと遊ぶ",
  },
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "itemname",
      description: "The name of the item",
      description_localizations: {
        fr: "Le nom de l'article",
        ja: "アイテムの名前",
      },
      autocomplete: true,
    },
    {
      type: ApplicationCommandOptionType.Boolean,
      name: "hide",
      name_localizations: { fr: "masquer", ja: "非表示" },
      description: "Hides the output",
      description_localizations: {
        fr: "Masque le résultat",
        ja: "出力を非表示にする",
      },
    },
  ],
  nsfw: false,
  dm_permission: false,
  default_member_permissions: "0",
} as const;
