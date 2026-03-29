

import { generateLocalizedChoices } from "#utils/builders/choices.js";
import { FoodType } from "#utils/enums/foodType.js";
import { MedicineType } from "#utils/enums/medecineType.js";
import { ToyType } from "#utils/enums/toyType.js";
import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const buyCommand = {
  name: "buy",
  description: "Buy an item from the shop",
  description_localizations: {
    fr: "Acheter un article dans la boutique",
    ja: "ショップからアイテムを購入する",
  },
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "food",
      description: "Buy food items",
      description_localizations: {
        fr: "Acheter des articles alimentaires",
        ja: "食品を購入する",
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
          choices: generateLocalizedChoices(FoodType, "shop.food"),
        },
        {
          type: ApplicationCommandOptionType.Integer,
          name: "quantity",
          description: "The quantity of the item",
          description_localizations: {
            fr: "La quantité de l'article",
            ja: "アイテムの数量",
          },
          required: true,
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
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "toy",
      description: "Buy toy items",
      description_localizations: {
        fr: "Acheter des jouets",
        ja: "おもちゃを買う",
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
          choices: generateLocalizedChoices(ToyType, "shop.toys"),
        },
        {
          type: ApplicationCommandOptionType.Integer,
          name: "quantity",
          description: "The quantity of the item",
          description_localizations: {
            fr: "La quantité de l'article",
            ja: "アイテムの数量",
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
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "medicine",
      description: "Buy medicine items",
      description_localizations: {
        fr: "Acheter des médicaments",
        ja: "薬を買う",
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
          choices: generateLocalizedChoices(MedicineType, "shop.medicine"),
        },
        {
          type: ApplicationCommandOptionType.Integer,
          name: "quantity",
          description: "The quantity of the item",
          description_localizations: {
            fr: "La quantité de l'article",
            ja: "アイテムの数量",
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
    },
  ],
} as const
