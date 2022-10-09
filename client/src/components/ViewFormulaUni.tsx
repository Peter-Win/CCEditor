import * as React from "react";
import { ChemExpr } from "charchem/core/ChemExpr";
import { createChemImgProps } from "charchem/drawSys/browser/createChemImgProps";
import { SvgWebSurface } from "charchem/drawSys/browser/SvgWebSurface";
import { renderTopFrame } from "charchem/drawSys/figures/renderTopFrame";
import { isTextFormula } from "charchem/inspectors/isTextFormula";
import { makeTextFormula } from "charchem/inspectors/makeTextFormula";
import { buildExpression } from "charchem/structBuilder/buildExpression";
import { rulesHtml } from "charchem/textRules/rulesHtml";

interface PropsViewFormulaUni {
  expr: ChemExpr;
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

export const ViewFormulaUni: React.FC<PropsViewFormulaUni> = ({
  expr,
}: PropsViewFormulaUni) => {
  const code = isTextFormula(expr) ? makeTextFormula(expr, rulesHtml) : "";
  return (
    <div
      className="echem-formula"
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
  );
};
