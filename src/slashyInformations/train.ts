import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const trainCommand = {
  name: "train",
  description: "Train your pet",
  description_localizations: {
    fr: "Entraîner votre animal de compagnie",
    ja: "ペットを訓練する",
  },
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "skill",
      description: "The skill to train your pet",
      description_localizations: {
        fr: "La compétence à entraîner",
        ja: "ペットを訓練するスキル",
      },
      required: true,
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
}as const
