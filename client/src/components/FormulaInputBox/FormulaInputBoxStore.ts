import { makeAutoObservable } from "mobx";
import { ChemExpr } from "charchem/core/ChemExpr";
import { compile } from "charchem/compiler/compile";
import { debounce, DebounceCounter } from "../../utils/debounce";

const keyFormula = "curFormula";

export class FormulaInputBoxStore {
  constructor() {
    makeAutoObservable(this);
  }

  init() {
    try {
      const s = sessionStorage.getItem(keyFormula);
      this.formula = s || "";
      this.update();
    } catch (e) {}
  }

  counter: DebounceCounter = {};

  formula: string = "";

  setFormula(formula: string) {
    this.formula = formula;
    debounce(this.counter, 500, () => this.update());
  }

  expr: ChemExpr | null = null;

  setExpr(expr: ChemExpr | null) {
    this.expr = expr;
  }

  update() {
    const formula = this.formula.trim();
    if (!formula) {
      this.setExpr(null);
    } else {
      this.setExpr(compile(formula));
    }
    try {
      sessionStorage.setItem(keyFormula, formula);
    } catch (e) {}
  }

  insertFormula(code: string) {
    let { formula } = this;
    if (formula) formula += " + ";
    formula += code;
    this.setFormula(formula);
  }
}

export const formulaInputBoxStore = new FormulaInputBoxStore();
