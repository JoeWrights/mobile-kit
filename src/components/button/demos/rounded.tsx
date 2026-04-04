import React from "react";
import { Space } from "antd-mobile";
import { Button } from "@joewrights/mobile-kit";

export default () => {
  return (
    <Space direction="vertical" block>
      <Button color="primary" shape="rounded">
        默认圆角
      </Button>
      <Button color="primary">关闭圆角</Button>
    </Space>
  );
};
