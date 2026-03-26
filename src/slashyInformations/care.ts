import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const careCommand = {
  name: "care",
  description: "Take care of your pet",
  description_localizations: {
    fr: "Prenez soin de votre animal de compagnie",
    ja: "ペットの世話をする",
  },
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "itemname",
      description: "The name of the item used",
      description_localizations: {
        fr: "Le nom de l'article utilisé",
        ja: "使用するアイテムの名前",
      },
      required: false,
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
