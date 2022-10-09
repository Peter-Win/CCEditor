export interface AskSubstIdFormula {
  id: number;
  formula: string;
}
export interface AskSubstId {
  id: number;
  brutto: string;
  PubChem: number;
  cas_rn: string;
  name: string;
  formulas: AskSubstIdFormula[];
}
