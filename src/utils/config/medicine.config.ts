import { MedicineCategory, MedicineType } from "#utils/enums/medecineType.js";
import { QuestType } from "#utils/enums/questType.js";

export const MEDICINE_CONFIG = {
  [MedicineType.VITAMINS]: {
    category: MedicineCategory.GENERAL,
    price: 25,
    health: 25,
  },
 [MedicineType.ANTIBIOTICS]: {
    category: MedicineCategory.SKIN,
    price: 30,
    health: 30,
  },
  [MedicineType.PAINKILLERS]: {
    category: MedicineCategory.GENERAL,
    price: 15,
    health: 15,
  },
  [MedicineType.BANDAGES]: {
    category: MedicineCategory.SKIN,
    price: 10,
    health: 10,
  },
  [MedicineType.ANTISEPTIC]: {
    category: MedicineCategory.SPECIAL,
    price: 12,
    health: 12,
  },
  [MedicineType.EAR_DROPS]: {
    category: MedicineCategory.SPECIAL,
    price: 8,
    health: 8,
  },
  [MedicineType.COUGH_SYRUP]: {
    category: MedicineCategory.GENERAL,
    price: 18,
    health: 18,
  },
  [MedicineType.ALLERGY_PILLS]: {
    category: MedicineCategory.SPECIAL,
    price:22 ,
    health:22 ,
  },
  [MedicineType.DIGESTIVE_AID]: {
    category: MedicineCategory.SPECIAL,
    price: 20,
    health: 20,
  },
  [MedicineType.SKIN_OINTMENT]: {
    category: MedicineCategory.SKIN,
    price: 14,
    health: 14,
  },
  [MedicineType.ANTI_INFLAMMATORY]: {
    category: MedicineCategory.GENERAL,
    price: 28,
    health: 28,
  },
  [MedicineType.HYDRATION_PACK]: {
    category: MedicineCategory.SPECIAL,
    price: 35,
    health: 35,
  },
  [MedicineType.ENERGY_BOOST]: {
    category: MedicineCategory.SPECIAL,
    price: 40,
    health: 40,
  },
  [MedicineType.EYE_DROPS]: {
    category: MedicineCategory.EYES,
    price: 8,
    health: 8,
  },

  [MedicineType.SPA_TREATMENT]: {
    category: MedicineCategory.SPECIAL,
    price: 50,
    health: 50,
    quest: QuestType.SPA_DAY, 
  },

  [MedicineType.VET_VISIT]: {
    category: MedicineCategory.SPECIAL,
    price: 60,
    health: 60,
    quest: QuestType.VISIT_VET,
  },
};
