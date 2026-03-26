import { AnimalCategory, availablePetsType } from "#utils/enums/animalType.js";
import { FoodCategory, FoodType } from "#utils/enums/foodType.js";
import { MedicineCategory, MedicineType } from "#utils/enums/medecineType.js";
import { ToyCategory, ToyType } from "#utils/enums/toyType.js";

export interface MedicineItem {
  type: MedicineType;
  category: MedicineCategory;
  price: number;
  healthBenefit: number;
}
export interface FoodItem {
  type: FoodType;
  category: FoodCategory;
  price: number;
  hunger: number;
  health: number;
}
export interface ToyItem {
  type: ToyType;
  category: ToyCategory;
  fun:number
  price: number;
}
export interface Animal {
  type: availablePetsType;
  category: AnimalCategory;
  personality?: string
  defaultHunger: number;
  defaultHappiness: number;
  defaultHealth: number;
}

