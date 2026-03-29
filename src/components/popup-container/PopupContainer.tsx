import React from "react";
import "./index.less";
import { getPrefixCls } from "../../utils";
import type { PopupContainerProps } from "./types";
import { Button, Popup } from "antd-mobile";
import classNames from "classnames";

const PopupContainer: React.FC<PopupContainerProps> = ({
  title,
  className,
  contentClassName,
  footerClassName,
  visible,
  footerRender,
  footerButtonsProps,
  confirmButtonPosition = "bottom",
  needConfirmButton = true,
  needFooter = false,
  onCancel,
  onConfirm,
  children,
  ...props
}) => {
  const prefixCls = getPrefixCls("popup-container-wrapper");

  const renderHeader = () => {
    if (confirmButtonPosition === "top" && needConfirmButton) {
      return (
        <div className={classNames("title-wrapper", "normal-mode")}>
          <div className="cancel-button">取消</div>
          <div className="title">{title}</div>
          <div className="confirm-button">确定</div>
        </div>
      );
    }
    return (
      <div className={classNames("title-wrapper", "footer-mode")}>
        <div className="title">{title}</div>
        <div className="icon-close-wrapper"></div>
      </div>
    );
  };

  const renderFooter = () => {
    if (!needFooter) return null;
    const defaultFooter = (
      <div className="default-footer">
        <Button color="primary" {...footerButtonsProps} onClick={onConfirm}>
          <div className="footer-button-text">
            {footerButtonsProps?.buttonText || "确定"}
          </div>
        </Button>
      </div>
    );
    return (
      <div className="footer-wrapper">{footerRender || defaultFooter}</div>
    );
  };

  return (
    <Popup
      className={classNames(prefixCls, className)}
      visible={visible}
      {...props}
    >
      <div className="popup-container-inner-wrapper">
        <div className={classNames(prefixCls, className)}>
          <div className="header-wrapper">{renderHeader()}</div>
          <div className={classNames("content-wrapper", contentClassName)}>
            {children}
          </div>
          <div className={classNames("footer-wrapper", footerClassName)}>
            {renderFooter()}
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default PopupContainer;
