import type { ButtonProps as AntdMobileButtonProps } from 'antd-mobile';

export interface ButtonProps extends AntdMobileButtonProps {
  /**
   * 业务层扩展：是否显示移动端常用圆角样式
   */
  rounded?: boolean;
}
