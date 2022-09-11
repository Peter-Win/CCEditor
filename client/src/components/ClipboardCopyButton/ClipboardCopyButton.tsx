import * as React from "react";
import { Button, notification } from "antd";
import { CopyOutlined } from "@ant-design/icons";

// Кнопка копирования в буфер обмена.

// The current implementation of the Async Clipboard API only supports text/plain, image/png, and text/html.
// image/svg+xml is not supported.

interface PropsClipboardCopyButton {
  disabled?: boolean;
  makeBlob(): Blob; // example: new Blob([text], { type: "text/html" })
  successMessage: string;
}

export const ClipboardCopyButton: React.FC<PropsClipboardCopyButton> = ({
  disabled,
  makeBlob,
  successMessage,
}: PropsClipboardCopyButton) => (
  <Button
    disabled={disabled}
    icon={<CopyOutlined />}
    onClick={() => {
      const blob = makeBlob();
      const data = [new ClipboardItem({ [blob.type]: blob })];
      navigator.clipboard
        ?.write(data)
        .then(() => notification.info({ message: successMessage }))
        .catch((e) => notification.error({ message: e.message }));
    }}
  />
);

export const isAsyncClipboardEnable = (): boolean => "clipboard" in navigator;
