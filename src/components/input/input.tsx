/* eslint-disable react/require-default-props */
import "./input.less"

import {
    Ellipsis,
    Input as AntdMobileInput,
    InputProps as AntdMobileInputProps,
} from "antd-mobile"
import classNames from "classnames"
import React from "react"

import { NOOP_TEXT } from "@/constants"
import { getPrefixCls } from "@/utils"

const prefixCls = getPrefixCls("input")

export interface InputProps extends AntdMobileInputProps {
    className?: string
    editable?: boolean
}

const Input: React.FC<InputProps> = ({
    className,
    value,
    editable = true,
    ...props
}) => {
    return (
        <div className={classNames(prefixCls, className)}>
            {editable ? (
                <AntdMobileInput {...props} />
            ) : (
                <Ellipsis content={value || NOOP_TEXT} direction="end" />
            )}
        </div>
    )
}

export default Input
