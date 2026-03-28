import React from 'react';
import { Button as AntdMobileButton } from 'antd-mobile';
import type { ButtonProps as AntdMobileButtonProps } from 'antd-mobile';
import classNames from 'classnames';
import './style.less';

export interface ButtonProps extends AntdMobileButtonProps {
  /**
   * 业务层扩展：是否显示移动端常用圆角样式
   */
  rounded?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  rounded = true,
  className,
  ...restProps
}) => {
  return (
    <AntdMobileButton
      className={classNames('mk-button', rounded && 'mk-button-rounded', className)}
      {...restProps}
    />
  );
};

Button.displayName = 'Button';
