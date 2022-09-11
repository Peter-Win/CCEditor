import * as React from "react";
import styles from "./FloadToolbox.module.less";

// Родительский контейнер для тулбокса должен иметь position: relative

interface PropsFloadToolbox {
  children?: React.ReactNode;
}

export const FloadToolbox: React.FC<PropsFloadToolbox> = ({ children }: PropsFloadToolbox) => (
  <div className={styles.floadTooltip}>
    {children}
  </div>
);

FloadToolbox.defaultProps = {
  children: null,
};