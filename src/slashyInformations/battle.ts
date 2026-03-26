import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const battleCommand = {
  name: "battle",
  description: "Battle with another pet",
  description_localizations: {
    fr: "Combattre avec un autre animal de compagnie",
    ja: "他のペットと戦う",
  },
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "opponent",
      description: "The ID of the opponent",
      description_localizations: {
        fr: "L'ID de l'adversaire",
        ja: "対戦相手のID",
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