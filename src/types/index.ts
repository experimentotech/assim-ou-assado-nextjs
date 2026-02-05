// ============================================================================
// TYPES
// ============================================================================

export type FoodClassif = "P" | "C" | "L";

export interface Food {
  id: number;
  nome: string;
  prot: number;
  carb: number;
  lip: number;
  classif: FoodClassif;
  medida_un?: number;
}

export interface FoodSearchable extends Food {
  searchTerms: string;
}

export interface ComparisonRow {
  label: string;
  fromValue: number;
  toValue: number;
  isSelected: boolean;
  suffix: string;
}
