import * as React from "react";
import { observer } from "mobx-react-lite";
import { isTextFormula } from "charchem/inspectors/isTextFormula";
import { makeTextFormula } from "charchem/inspectors/makeTextFormula";
import { rulesHtml } from "charchem/textRules/rulesHtml";
import { createChemImgProps } from "charchem/drawSys/browser/createChemImgProps";
import { SvgWebSurface } from "charchem/drawSys/browser/SvgWebSurface";
import { buildExpression } from "charchem/structBuilder/buildExpression";
import { TextProps, ChemImgProps } from "charchem/drawSys/ChemImgProps";
import { renderTopFrame } from "charchem/drawSys/figures/renderTopFrame";

import { ChemExpr } from "charchem/core/ChemExpr";
import { FormulaInputBoxStore } from "../FormulaInputBox";
import styles from "./FormulaDefaultView.module.less";

interface PropsFormulaDefaultView {
  store: FormulaInputBoxStore;
}

const renderFormulaSvg = (owner: HTMLElement, expr: ChemExpr) => {
  if (!document) return;
  const surface = new SvgWebSurface();
  const props = createChemImgProps(owner, surface);
  const { frame } = buildExpression(expr, props);
  renderTopFrame(frame, surface);
  const { bounds } = frame;
  owner.innerHTML = surface.exportText({
    width: `${bounds.width}px`,
    height: `${bounds.height}px`,
  });
};

export const FormulaDefaultView: React.FC<PropsFormulaDefaultView> = observer(
  ({ store }: PropsFormulaDefaultView) => {
    const { expr } = store;
    if (!expr) return null;
    const code = isTextFormula(expr) ? makeTextFormula(expr, rulesHtml) : "";
    return (
      <div className={styles.formulaDefaultView}>
        <label>Result:</label>
        <div
          className="echem-formula"
          style={{ fontSize: 30 }}
          ref={(elem) => {
            if (elem) {
              if (code) {
                elem.innerHTML = code;
              } else {
                renderFormulaSvg(elem, expr);
              }
            }
          }}
        />
      </div>
    );
  }
);
