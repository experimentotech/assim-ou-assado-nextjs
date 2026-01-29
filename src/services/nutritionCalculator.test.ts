import { describe, expect, it } from "vitest";
import {
  calculateDestinationQuantity,
  calculateNutrition,
} from "./nutritionCalculator";
import type { Alimento } from "@/types";

describe("calculateDestinationQuantity", () => {
  it("uses protein for P classification", () => {
    const fromFood: Alimento = {
      id: 1,
      nome: "Frango",
      prot: 20,
      carb: 0,
      lip: 5,
      classif: "P",
    };
    const toFood: Alimento = {
      id: 2,
      nome: "Tofu",
      prot: 10,
      carb: 2,
      lip: 4,
      classif: "P",
    };

    expect(calculateDestinationQuantity(fromFood, toFood, 150)).toBe(300);
  });

  it("uses carbs for C classification", () => {
    const fromFood: Alimento = {
      id: 3,
      nome: "Arroz",
      prot: 2,
      carb: 28,
      lip: 1,
      classif: "C",
    };
    const toFood: Alimento = {
      id: 4,
      nome: "Macarrao",
      prot: 5,
      carb: 20,
      lip: 2,
      classif: "C",
    };

    expect(calculateDestinationQuantity(fromFood, toFood, 100)).toBe(140);
  });

  it("uses lipids for L classification", () => {
    const fromFood: Alimento = {
      id: 5,
      nome: "Azeite",
      prot: 0,
      carb: 0,
      lip: 100,
      classif: "L",
    };
    const toFood: Alimento = {
      id: 6,
      nome: "Abacate",
      prot: 2,
      carb: 9,
      lip: 15,
      classif: "L",
    };

    expect(calculateDestinationQuantity(fromFood, toFood, 10)).toBe(67);
  });

  it("compares a carb with a no carb food", () => {
    const fromFood: Alimento = {
      id: 236,
      nome: "Melão",
      prot: 0.6,
      carb: 7.5,
      lip: 0.0,
      classif: "C",
    };
    const toFood: Alimento = {
      id: 410,
      nome: "Filé de frango grelhado",
      prot: 32.0,
      carb: 0.0,
      lip: 2.4,
      classif: "P",
    };
    expect(calculateDestinationQuantity(fromFood, toFood, 150)).toBe(0);
  });
});

describe("calculateNutrition", () => {
  it("calculates macro totals for given quantity", () => {
    const food: Alimento = {
      id: 7,
      nome: "Iogurte",
      prot: 5,
      carb: 10,
      lip: 2,
      classif: "P",
    };

    const result = calculateNutrition(food, 50);

    expect(result).toEqual({
      weight: 50,
      kcal: 5 * 4 * 0.5 + 10 * 4 * 0.5 + 2 * 9 * 0.5,
      prot: 2.5,
      carb: 5,
      gord: 1,
    });
  });

  it("calculates when quantity is 0", () => {
    const food: Alimento = {
      id: 7,
      nome: "Iogurte",
      prot: 5,
      carb: 10,
      lip: 2,
      classif: "P",
    };

    expect(calculateNutrition(food, 0)).toEqual({
      weight: 0,
      kcal: 0,
      prot: 0,
      carb: 0,
      gord: 0,
    });
  });
});
