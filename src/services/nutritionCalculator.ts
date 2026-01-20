import { Alimento } from "@/types";

/**
 * Calculates destination food quantity based on macronutrient classification
 */
export const calculateDestinationQuantity = (
  fromFood: Alimento,
  toFood: Alimento,
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

  const fromTotal = (fromPer100g * fromQuantity) / 100;
  return Math.round((100 * fromTotal) / toPer100g);
};

/**
 * Calculates nutritional values for a given quantity
 */
export const calculateNutrition = (food: Alimento, quantity: number) => {
  const multiplier = quantity / 100;
  const kcal = food.prot * 4 + food.carb * 4 + food.lip * 9;
  return {
    weight: quantity,
    kcal: kcal * multiplier,
    prot: food.prot * multiplier,
    carb: food.carb * multiplier,
    gord: food.lip * multiplier,
  };
};
