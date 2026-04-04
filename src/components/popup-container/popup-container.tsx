import "./popup-container.less"

import { Button, Popup } from "antd-mobile"
import { CloseOutline } from "antd-mobile-icons"
import classNames from "classnames"
import React from "react"

import { getPrefixCls } from "../../utils"
import { PopupContainerProps } from "./types"

const prefixCls = getPrefixCls("popup-container-wrapper")

const PopupContainer: React.FC<PopupContainerProps> = ({
    title,
    className,
    headerClassName,
    contentClassName,
    footerClassName,
    visible,
    footerRender,
    footerButtonsProps,
    confirmButtonPosition = "top",
    showConfirmButton = true,
    showFooter = false,
    onCancel,
    onConfirm,
    children,
    ...props
}) => {
    const { buttonText = "确定", ...restFooterButtonsProps } =
        footerButtonsProps || {}

    const renderHeader = () => {
        if (confirmButtonPosition === "top" && showConfirmButton) {
            return (
                <>
                    <div
                        className={`${prefixCls}__cancel-button`}
                        onClick={onCancel}
                    >
                        取消
                    </div>
                    <div className={`${prefixCls}__title`}>{title}</div>
                    <div
                        className={`${prefixCls}__confirm-button`}
                        onClick={onConfirm}
                    >
                        确定
                    </div>
                </>
            )
        }
        return (
            <>
                <div className={`${prefixCls}__title`}>{title}</div>
                <div
                    className={`${prefixCls}__close-button`}
                    onClick={onCancel}
                >
                    <CloseOutline className={`${prefixCls}__close-icon`} />
                </div>
            </>
        )
    }

    const renderFooter = () => {
        if (!showFooter) return null
        const defaultFooter = (
            <div className={`${prefixCls}__footer-inner`}>
                <Button
                    color="primary"
                    {...restFooterButtonsProps}
                    onClick={onConfirm}
                >
                    <div className={`${prefixCls}__footer-button-text`}>
                        {buttonText}
                    </div>
                </Button>
            </div>
        )
        return footerRender || defaultFooter
    }

    return (
        <Popup
            className={classNames(prefixCls, className)}
            visible={visible}
            {...props}
        >
            <div className={`${prefixCls}__inner`}>
                <div
                    className={classNames(
                        `${prefixCls}__header`,
                        headerClassName,
                    )}
                >
                    {renderHeader()}
                </div>
                <div
                    className={classNames(
                        `${prefixCls}__content`,
                        contentClassName,
                    )}
                >
                    {children}
                </div>
                <div
                    className={classNames(
                        `${prefixCls}__footer`,
                        footerClassName,
                    )}
                >
                    {renderFooter()}
                </div>
            </div>
        </Popup>
    )
}

export default PopupContainer
