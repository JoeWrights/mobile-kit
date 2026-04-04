import React from "react";
import { Button as AntdMobileButton } from "antd-mobile";
import classNames from "classnames";
import type { ButtonProps } from "./types";
import "./button.less";

const Button: React.FC<ButtonProps> = ({
  rounded = true,
  className,
  ...restProps
}) => {
  return (
    <AntdMobileButton
      className={classNames(
        "mk-button",
        rounded && "mk-button-rounded",
        className,
      )}
      {...restProps}
    />
  );
};

export default Button;
