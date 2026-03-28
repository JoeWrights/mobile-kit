import React from 'react';
import { Space } from 'antd-mobile';
import { Button } from '@joewrights/mobile-kit';

export default () => {
  return (
    <Space direction='vertical' block>
      <Button rounded>默认圆角</Button>
      <Button rounded={false}>关闭圆角</Button>
    </Space>
  );
};
