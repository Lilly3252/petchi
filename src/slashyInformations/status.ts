import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const statusCommand = {
  name: "status",
  description: "Check the status of your pet",
  description_localizations: {
    fr: "Vérifiez l'état de votre animal de compagnie",
    ja: "ペットの状態を確認する",
  },
  options: [
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
