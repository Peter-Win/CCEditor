import { Alert, Space } from "antd";
import * as React from "react";
import { roundMass } from "charchem/math/massUtils";
import { HtmlFormulaView } from "../HtmlFormulaView";
import { AgentInfo } from "./AgentInfo";

interface PropsSingleAgent {
  info: AgentInfo;
}

export const SingleAgent: React.FC<PropsSingleAgent> = ({
  info,
}: PropsSingleAgent) => {
  const { isAbstract, brutto, mass, charge } = info;
  if (isAbstract) {
    return (
      <Alert
        showIcon
        type="warning"
        message="An abstract formula is not subject to computational processing."
      />
    );
  }
  return (
    <Space size="large">
      {!!brutto && (
        <div>
          Brutto: <HtmlFormulaView expr={brutto} />
        </div>
      )}
      {!!mass && <div>Mass: {roundMass(mass)} DA</div>}
      {!!charge && <div>Charge: {charge}</div>}
    </Space>
  );
};
