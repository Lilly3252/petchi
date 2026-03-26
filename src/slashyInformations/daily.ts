 import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export const dailyCommand = {
 name: "daily",
      description: "Get 50 coins! (available each 24h)",
      description_localizations: {
        fr: "Obtenez 50 pièces! (disponible toutes les 24h)",
        ja: "50コインを獲得！ (24時間ごとに利用可能)",
      },
      options: [
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