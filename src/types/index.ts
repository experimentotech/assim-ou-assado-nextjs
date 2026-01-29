// ============================================================================
// TYPES
// ============================================================================

export type AlimentoClassif = "P" | "C" | "L";

export interface Alimento {
  id: number;
  nome: string;
  prot: number;
  carb: number;
  lip: number;
  classif: AlimentoClassif;
  medida_un?: number;
}

export interface AlimentoSearchable extends Alimento {
  searchTerms: string;
}

export interface ComparisonRow {
  label: string;
  fromValue: number;
  toValue: number;
  isSelected: boolean;
  suffix: string;
}
