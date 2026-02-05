import { Food } from "@/types";

/**
 * Calculates destination food quantity based on macronutrient classification
 */
export const calculateDestinationQuantity = (
  fromFood: Food,
  toFood: Food,
  fromQuantity: number,
): number => {
  const attr =
    fromFood.classif === "P"
      ? "prot"
      : fromFood.classif === "C"
        ? "carb"
        : "lip";
  const fromPer100g = fromFood[attr];
  const toPer100g = toFood[attr];

  if (toPer100g === 0) {
    return 0;
  }

  const fromWeight =
    fromFood.medida_un != null
      ? fromFood.medida_un * fromQuantity
      : fromQuantity;
  const fromTotal = (fromPer100g * fromWeight) / 100;
  const gramsNeeded = (100 * fromTotal) / toPer100g;

  if (toFood.medida_un != null && toFood.medida_un > 0) {
    return Math.round(gramsNeeded / toFood.medida_un);
  }

  return Math.round(gramsNeeded);
};

/**
 * Calculates nutritional values for a given quantity
 */
export const calculateNutrition = (food: Food, quantity: number) => {
  const weight = food.medida_un != null ? food.medida_un * quantity : quantity;
  const multiplier = weight / 100;
  const kcal = food.prot * 4 + food.carb * 4 + food.lip * 9;
  return {
    weight,
    kcal: kcal * multiplier,
    prot: food.prot * multiplier,
    carb: food.carb * multiplier,
    gord: food.lip * multiplier,
  };
};
