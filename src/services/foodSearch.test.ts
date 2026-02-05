import { describe, expect, it } from "vitest";
import {
  normalizeText,
  prepareSearchableList,
  searchFoods,
} from "./foodSearch";
import type { Food } from "@/types";

const baseFoods: Food[] = [
  { id: 1, nome: "Arroz Integral", prot: 2, carb: 23, lip: 1, classif: "C" },
  { id: 2, nome: "Feijao Preto", prot: 9, carb: 14, lip: 1, classif: "P" },
  { id: 3, nome: "Ovo Cozido", prot: 13, carb: 1, lip: 11, classif: "P" },
];

describe("normalizeText", () => {
  it("removes accents and lowercases", () => {
    const input = "Caf\u00e9 com Leite";
    expect(normalizeText(input)).toBe("cafe com leite");
  });
});

describe("prepareSearchableList", () => {
  it("adds normalized search terms", () => {
    const list = prepareSearchableList(baseFoods);
    expect(list[0].searchTerms).toBe("arroz integral");
    expect(list[1].searchTerms).toBe("feijao preto");
  });
});

describe("searchFoods", () => {
  it("returns empty array for blank query", () => {
    const list = prepareSearchableList(baseFoods);
    expect(searchFoods("   ", list)).toEqual([]);
  });

  it("matches multiple terms", () => {
    const list = prepareSearchableList(baseFoods);
    const results = searchFoods("arroz integral", list);
    expect(results.map((item) => item.id)).toEqual([1]);
  });

  it("excludes a specific id", () => {
    const list = prepareSearchableList(baseFoods);
    const results = searchFoods("ovo", list, 3);
    expect(results).toEqual([]);
  });

  it("normalizes query before matching", () => {
    const list = prepareSearchableList(baseFoods);
    const results = searchFoods("feij\u00e3o", list);
    expect(results.map((item) => item.id)).toEqual([2]);
  });
});
