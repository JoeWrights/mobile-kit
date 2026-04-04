import React, { useMemo } from "react"
import { Button as AntdMobileButton } from "antd-mobile"
import type { ButtonProps as AntdMobileButtonProps } from "antd-mobile"
import classNames from "classnames"
import type { ButtonProps } from "./types"
import { getPrefixCls } from "@/utils"
import "./button.less"

const prefixCls = getPrefixCls("button")

const Button: React.FC<ButtonProps> = ({
    block = true,
    shape = "default",
    className,
    color,
    fill,
    icon,
    children,
    ...props
}) => {
    const isCustomColor = color && ["secondary", "third"].includes(color)
    const colorClassName = isCustomColor ? `${prefixCls}-${color}` : ""

    const mergedColor = useMemo(() => {
        if (isCustomColor) return "default"
        return color as AntdMobileButtonProps["color"]
    }, [])

    const mergedFill = useMemo(() => {
        if (fill) return fill
        if (color === "danger") return "outline"
    }, [])

    return (
        <AntdMobileButton
            className={classNames(prefixCls, colorClassName, className)}
            block={block}
            color={mergedColor}
            fill={mergedFill}
            shape={shape}
            {...props}
        >
            <div className={`${prefixCls}__content`}>
                {icon && <div className={`${prefixCls}__icon`}>{icon}</div>}
                {children}
            </div>
        </AntdMobileButton>
    )
}

export default Button
