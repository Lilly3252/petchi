import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const feedCommand = {
  name: "feed",
  description: "Feed your pet",
  description_localizations: {
    fr: "Nourrir votre animal de compagnie",
    ja: "ペットに餌をあげる",
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
      required: true,
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
}as const
