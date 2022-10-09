import * as React from "react";
import { roundMass } from "charchem/math/massUtils";
import { HtmlFormulaView } from "../HtmlFormulaView";
import { AgentInfo } from "./AgentInfo";
import styles from "./InspectorsResult.module.less";

interface PropsMultiAgents {
  info: AgentInfo[];
}

export const MultiAgents: React.FC<PropsMultiAgents> = ({
  info,
}: PropsMultiAgents) => (
  <table className={styles.agentsInfo}>
    <thead>
      <tr>
        <th>Brutto</th>
        <th>Mass (Da)</th>
        <th>Charge</th>
      </tr>
    </thead>
    <tbody>
      {
        // К сожалению, у агента нет уникального ключа. И вообще, не запрещено использовать одинаковые агенты в выражении.
        info.map(({ agent, brutto, isAbstract, mass, charge }, i) => (
          <tr key={i}>
            <td>
              <HtmlFormulaView expr={brutto ?? agent} />
            </td>
            {isAbstract && <td colSpan={2}>Abstract formula</td>}
            {!isAbstract && (
              <>
                <td>{mass && roundMass(mass)}</td>
                <td>{charge}</td>
              </>
            )}
          </tr>
        ))
      }
    </tbody>
  </table>
);
