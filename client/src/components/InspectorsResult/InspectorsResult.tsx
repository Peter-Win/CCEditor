import * as React from "react";
import { observer } from "mobx-react-lite";
import { Alert } from "antd";
import { FormulaInputBoxStore } from "../FormulaInputBox";
import { makeAgentInfoList } from "./AgentInfo";
import { SingleAgent } from "./SingleAgent";
import { MultiAgents } from "./MultiAgents";
import styles from "./InspectorsResult.module.less";
import { BlockHeader } from "../BlockHeader";

interface PropsInspectorsResult {
  store: FormulaInputBoxStore;
}

export const InspectorsResult: React.FC<PropsInspectorsResult> = observer(
  ({ store }: PropsInspectorsResult) => {
    const { expr } = store;
    if (!expr) return null;
    const info = makeAgentInfoList(expr);
    return (
      <>
        <BlockHeader text="Calculated properties:" />
        {info instanceof Error ? (
          <Alert type="error" message={info.message} />
        ) : (
          <div className={styles.inspectorsResult}>
            {info.length === 1 ? (
              <SingleAgent info={info[0]!} />
            ) : (
              <MultiAgents info={info} />
            )}
          </div>
        )}
      </>
    );
  }
);
