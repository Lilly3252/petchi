
import { generateLocalizedChoices } from "#utils/builders/choices.js";
import { availablePetsType } from "#utils/enums/animalType.js";
import { ApplicationCommandOptionType } from "discord-api-types/v10";



export const adoptCommand = {
  name: "adopt",
  description: "Adopt a new pet",
  description_localizations: {
    fr: "Adopter un nouvel animal de compagnie",
    ja: "新しいペットを養子にする",
  },
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "petname",
      description: "The name of your pet",
      description_localizations: {
        fr: "Le nom de votre animal de compagnie",
        ja: "ペットの名前",
      },
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "pettype",
      description: "The type of pet",
      description_localizations: {
        fr: "Le type d'animal de compagnie",
        ja: "ペットの種類",
      },
      required: true,
      choices:generateLocalizedChoices(availablePetsType, "pets")
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
  dm_permission:false, 
  default_member_permissions: "0",
}as const