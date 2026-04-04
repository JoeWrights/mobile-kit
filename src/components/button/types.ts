import type { ButtonProps as AntdMobileButtonProps } from "antd-mobile"

export type ButtonColor = AntdMobileButtonProps["color"] | "secondary" | "third"

export interface ButtonProps extends Omit<AntdMobileButtonProps, "color"> {
    color?: ButtonColor
    icon?: React.ReactNode
}
