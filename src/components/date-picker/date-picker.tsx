/* eslint-disable unicorn/no-useless-undefined */
import "./date-picker.less"

import { DatePickerView } from "antd-mobile"
import { PickerDate } from "antd-mobile/es/components/date-picker/util"
import classNames from "classnames"
import React, { useEffect, useMemo, useState } from "react"

import { getPrefixCls } from "@/utils"

import { PopupContainer } from "../popup-container"
import { DatePickerProps } from "./types"

const prefixCls = getPrefixCls("date-picker")

const fallbackDefaultValue = new Date()

const DatePicker: React.FC<DatePickerProps> = ({
    value,
    defaultValue,
    onChange,
    title,
    className,
    visible,
    onCancel,
    datePickerViewProps,
    ...props
}) => {
    const [selectedValue, setSelectedValue] = useState<PickerDate>()
    const mergedDefaultValue = useMemo(
        () => defaultValue ?? fallbackDefaultValue,
        [defaultValue],
    )

    useEffect(() => {
        if (!visible) return
        setSelectedValue(undefined)
    }, [visible])

    const confirmedValue = useMemo(
        () => selectedValue ?? value ?? mergedDefaultValue,
        [selectedValue, value, mergedDefaultValue],
    )

    return (
        <PopupContainer
            {...props}
            className={classNames(prefixCls, className)}
            title={title}
            visible={visible}
            onCancel={onCancel}
            onConfirm={() => onChange?.(confirmedValue)}
        >
            <DatePickerView
                {...datePickerViewProps}
                defaultValue={mergedDefaultValue}
                mouseWheel
                value={confirmedValue}
                className={classNames(
                    `${prefixCls}__picker-view`,
                    datePickerViewProps?.className,
                )}
                onChange={(val) => setSelectedValue(val)}
            />
        </PopupContainer>
    )
}

export default DatePicker
