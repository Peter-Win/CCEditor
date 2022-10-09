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
import { BlockHeader } from "../BlockHeader";
import { ViewFormulaUni } from "../ViewFormulaUni";

interface PropsFormulaDefaultView {
  store: FormulaInputBoxStore;
}

export const FormulaDefaultView: React.FC<PropsFormulaDefaultView> = observer(
  ({ store }: PropsFormulaDefaultView) => {
    const { expr } = store;
    if (!expr) return null;
    return (
      <div className={styles.formulaDefaultView}>
        <BlockHeader text="Result:" />
        <div className={styles.formulaBox}>
          <ViewFormulaUni expr={expr} />
        </div>
      </div>
    );
  }
);
