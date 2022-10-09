import * as React from "react";
import styles from "./BlockHeader.module.less";

interface PropsBlockHeader {
  text: string;
}

export const BlockHeader: React.FC<PropsBlockHeader> = ({
  text,
}: PropsBlockHeader) => <h3 className={styles.blockHeader}>{text}</h3>;
