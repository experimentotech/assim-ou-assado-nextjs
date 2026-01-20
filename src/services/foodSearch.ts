import { Alimento, AlimentoSearchable } from "@/types";

/**
 * Normalizes text by removing accents and converting to lowercase
 */
export const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

/**
 * Prepares food list for searching by pre-computing normalized search terms
 */
export const prepareSearchableList = (
  alimentos: Alimento[],
): AlimentoSearchable[] => {
  return alimentos.map((alimento) => ({
    ...alimento,
    searchTerms: normalizeText(alimento.nome),
  }));
};

/**
 * Searches foods by multiple terms (space-separated)
 * Each term must be present in the food name
 */
export const searchFoods = (
  query: string,
  foods: AlimentoSearchable[],
  excludeId?: number,
): AlimentoSearchable[] => {
  if (!query.trim()) return [];

  const normalizedQuery = normalizeText(query);
  const terms = normalizedQuery.split(/\s+/).filter((t) => t.length > 0);

  return foods.filter((food) => {
    if (excludeId && food.id === excludeId) return false;
    return terms.every((term) => food.searchTerms.includes(term));
  });
};
