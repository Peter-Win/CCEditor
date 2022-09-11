import * as React from "react";
import { observer } from "mobx-react-lite";
import { Button, notification, Tooltip } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import styles from "./SvgTextView.module.less";
import { PropsEditorStore } from "../PropsEditor";
import { FloadToolbox } from "src/components/FloadToolbox";

interface PropsSvgTextView {
  store: PropsEditorStore;
}

export const SvgTextView: React.FC<PropsSvgTextView> = observer(
  ({ store }: PropsSvgTextView) => (
    <div className={styles.svgTextView}>
      <FloadToolbox>
        <Tooltip title="Download SVG image file" placement="topRight">
          <Button
            disabled={store.svgDownloadDisabled}
            icon={<DownloadOutlined />}
            onClick={() =>
              store
                .svgDownload()
                .catch(({ message }) => notification.error({ message }))
            }
          />
        </Tooltip>
      </FloadToolbox>
      <textarea value={store.svgText} readOnly></textarea>
    </div>
  )
);
