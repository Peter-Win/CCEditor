import { ChemAgent } from "charchem/core/ChemAgent";
import { ChemExpr } from "charchem/core/ChemExpr";
import { calcMass } from "charchem/inspectors/calcMass";
import { isAbstract } from "charchem/inspectors/isAbstract";
import { makeBrutto } from "charchem/inspectors/makeBrutto";
import { calcCharge } from "charchem/inspectors/calcCharge";

export interface AgentInfo {
  agent: ChemAgent;
  isAbstract: boolean;
  brutto?: ChemExpr; // without coeff. For non-abstract
  mass?: number; // without coeff. For non-abstract
  charge?: number;
}

export const makeAgentInfo = (agent: ChemAgent): AgentInfo => {
  const abs = isAbstract(agent);
  const result: AgentInfo = {
    agent,
    isAbstract: abs,
  };
  if (!abs) {
    result.brutto = makeBrutto(agent, true);
    result.mass = calcMass(agent, false);
    result.charge = calcCharge(agent);
  }
  return result;
};

export const makeAgentInfoList = (expr: ChemExpr): AgentInfo[] | Error => {
  try {
    return expr.getAgents().map((a) => makeAgentInfo(a));
  } catch (e) {
    return e;
  }
};
