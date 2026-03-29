import React, { useState } from "react";
import { Button, Space } from "antd-mobile";
import { PopupContainer } from "@joewrights/mobile-kit";

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setVisible(true)}>
        打开 Popup
      </Button>
      <PopupContainer visible={visible} title="标题">
        <div style={{ padding: "20px 16px" }}>
          <Space direction="vertical" block>
            <div style={{ fontSize: 16, fontWeight: 600 }}>标题</div>
            <div style={{ color: "#666" }}>
              这是一个基于 antd-mobile 的 Popup 二次封装示例。
            </div>
            <Button block onClick={() => setVisible(false)}>
              关闭
            </Button>
          </Space>
        </div>
      </PopupContainer>
    </>
  );
};
