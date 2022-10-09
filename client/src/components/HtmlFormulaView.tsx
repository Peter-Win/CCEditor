import { ChemObj } from "charchem/core/ChemObj";
import { makeTextFormula } from "charchem/inspectors/makeTextFormula";
import { rulesHtml } from "charchem/textRules/rulesHtml";
import * as React from "react";

interface PropsHtmlFormulaView {
  expr: ChemObj;
}

export const HtmlFormulaView: React.FC<PropsHtmlFormulaView> = ({
  expr,
}: PropsHtmlFormulaView) => {
  const ref = React.useRef<HTMLDivElement>(null);
  if (ref.current) {
    try {
      ref.current.innerHTML = makeTextFormula(expr, rulesHtml);
    } catch (e) {
      return <div title={e.message}>Error</div>;
    }
  }
  return <div className="echem-formula" ref={ref} />;
};
