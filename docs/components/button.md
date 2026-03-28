# Button 按钮

移动端常用按钮。基于 `antd-mobile` 的 `Button` 做了统一样式封装，参考 [antd-mobile Button](https://mobile.ant.design/zh/components/button) 的交互和用法。

## 基础用法

```tsx
import React from 'react';
import { Space } from 'antd-mobile';
import { Button } from '@mobile-kit/ui';

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
```

## 圆角开关

```tsx
import React from 'react';
import { Space } from 'antd-mobile';
import { Button } from '@mobile-kit/ui';

export default () => {
  return (
    <Space direction='vertical' block>
      <Button rounded>默认圆角</Button>
      <Button rounded={false}>关闭圆角</Button>
    </Space>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rounded | 是否使用胶囊圆角样式 | `boolean` | `true` |

其余属性继承 `antd-mobile` 的 `ButtonProps`。
