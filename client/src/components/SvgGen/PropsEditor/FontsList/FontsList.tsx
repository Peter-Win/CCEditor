import * as React from "react";
import { observer } from "mobx-react-lite";
import styles from "./FontsList.module.less";
import { PropsEditorStore } from "../PropsEditorStore";
import { FontStatus } from "./FontStatus";

interface PropsFontsList {
  store: PropsEditorStore;
}

const size2str = (size: number) => `${Math.round(size / 1000)}K`;

export const FontsList: React.FC<PropsFontsList> = observer(
  ({ store }: PropsFontsList) => (
    <div className={styles.fontsList}>
      <div className={styles.fontsListBox}>
        {store.fonts.map(({ shortName, status, size }) => (
          <React.Fragment key={shortName}>
            <div className={styles.status}>
              <FontStatus
                status={status}
                shortName={shortName}
                usedFontNames={store.usedFontNames}
                onChange={(name, newStatus) =>
                  store.changeFontStatus(name, newStatus)
                }
              />
            </div>
            <div className={status === "ready" ? styles.ready : ""}>
              {shortName}
            </div>
            <div>{size2str(size)}</div>
          </React.Fragment>
        ))}
      </div>
      <div>Total used memory: {size2str(store.loadedFontsSize)}</div>
    </div>
  )
);
