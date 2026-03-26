import { ToyCategory, ToyType } from "#utils/enums/toyType.js";
import { ToyItem } from "#utils/types/shopInterfaces.js";

export const TOY_CONFIG: Record<ToyType, ToyItem> = {
  [ToyType.BALL]: {
    type: ToyType.BALL,
    category: ToyCategory.DOMESTIC,
    fun: 10,
    price: 8,
  },
  [ToyType.FRISBEE]: {
    type: ToyType.FRISBEE,
    category: ToyCategory.DOMESTIC,
    fun: 15,
    price: 12,
  },
  [ToyType.CHEW_TOY]: {
    type: ToyType.CHEW_TOY,
    category: ToyCategory.DOMESTIC,
    fun: 12,
    price: 7,
  },
  [ToyType.SQUEAKY_TOY]: {
    type: ToyType.SQUEAKY_TOY,
    category: ToyCategory.DOMESTIC,
    fun: 14,
    price: 9,
  },
  [ToyType.ROPE]: {
    type: ToyType.ROPE,
    category: ToyCategory.DOMESTIC,
    fun: 13,
    price: 11,
  },
  [ToyType.PLUSH]: {
    type: ToyType.PLUSH,
    category: ToyCategory.DOMESTIC,
    fun: 10,
    price: 13,
  },
  [ToyType.PUZZLE]: {
    type: ToyType.PUZZLE,
    category: ToyCategory.GENERAL,
    fun: 15,
    price: 15,
  },
  [ToyType.TUG]: {
    type: ToyType.TUG,
    category: ToyCategory.DOMESTIC,
    fun: 12,
    price: 10,
  },
  [ToyType.LASER]: {
    type: ToyType.LASER,
    category: ToyCategory.DOMESTIC,
    fun: 15,
    price: 20,
  },
  [ToyType.CATNIP]: {
    type: ToyType.CATNIP,
    category: ToyCategory.DOMESTIC,
    fun: 14,
    price: 5,
  },
  [ToyType.FEATHER_WAND]: {
    type: ToyType.FEATHER_WAND,
    category: ToyCategory.DOMESTIC,
    fun: 13,
    price: 6,
  },
  [ToyType.TUNNEL]: {
    type: ToyType.TUNNEL,
    category: ToyCategory.SMALL,
    fun: 12,
    price: 18,
  },
  [ToyType.CLIMBING]: {
    type: ToyType.CLIMBING,
    category: ToyCategory.DOMESTIC,
    fun: 15,
    price: 50,
  },
  [ToyType.SCRATCHING_POST]: {
    type: ToyType.SCRATCHING_POST,
    category: ToyCategory.DOMESTIC,
    fun: 12,
    price: 25,
  },

  [ToyType.BIRD_TOY]: {
    type: ToyType.BIRD_TOY,
    category: ToyCategory.BIRD,
    fun: 12,
    price: 10,
  },
  [ToyType.SWING]: {
    type: ToyType.SWING,
    category: ToyCategory.BIRD,
    fun: 14,
    price: 12,
  },
  [ToyType.MIRROR]: {
    type: ToyType.MIRROR,
    category: ToyCategory.BIRD,
    fun: 10,
    price: 8,
  },

  // 🐟 WATER (fish)
  [ToyType.BUBBLE_MAKER]: {
    type: ToyType.BUBBLE_MAKER,
    category: ToyCategory.WATER,
    fun: 10,
    price: 15,
  },
  [ToyType.AQUARIUM_DECOR]: {
    type: ToyType.AQUARIUM_DECOR,
    category: ToyCategory.WATER,
    fun: 8,
    price: 20,
  },

  [ToyType.HEAT_ROCK]: {
    type: ToyType.HEAT_ROCK,
    category: ToyCategory.REPTILE,
    fun: 9,
    price: 18,
  },
  [ToyType.CLIMBING_BRANCH]: {
    type: ToyType.CLIMBING_BRANCH,
    category: ToyCategory.REPTILE,
    fun: 11,
    price: 16,
  },

  [ToyType.WHEEL]: {
    type: ToyType.WHEEL,
    category: ToyCategory.SMALL,
    fun: 15,
    price: 14,
  },
  [ToyType.CHEW_BLOCK]: {
    type: ToyType.CHEW_BLOCK,
    category: ToyCategory.SMALL,
    fun: 10,
    price: 6,
  },
};
