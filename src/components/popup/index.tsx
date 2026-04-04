import "./style.less"

import {
    Popup as AntdMobilePopup,
    PopupProps as AntdMobilePopupProps,
} from "antd-mobile"
import classNames from "classnames"
import React from "react"

export interface PopupProps extends AntdMobilePopupProps {
    /**
     * 是否在底部弹层开启安全区内边距
     */
    safeArea?: boolean
}

export const Popup: React.FC<PopupProps> = ({
    safeArea = true,
    className,
    position = "bottom",
    ...restProps
}) => {
    return (
        <AntdMobilePopup
            className={classNames(
                "mk-popup",
                safeArea && position === "bottom" && "mk-popup-safe-area",
                className,
            )}
            position={position}
            {...restProps}
        />
    )
}

Popup.displayName = "Popup"
