import React from 'react';
import { Space } from 'antd-mobile';
import { Button } from '@joewrights/mobile-kit';

export default () => {
  return (
    <Space direction='vertical' block>
      <Button color='primary'>主要按钮</Button>
      <Button color='success'>成功按钮</Button>
      <Button color='warning'>警告按钮</Button>
      <Button color='danger'>危险按钮</Button>
    </Space>
  );
};
