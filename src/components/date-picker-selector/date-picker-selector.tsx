import "./date-picker-selector.less"

import { PickerDate } from "antd-mobile/es/components/date-picker/util"
import classNames from "classnames"
import React, { useMemo, useState } from "react"

import { getPrefixCls } from "@/utils"

import DatePicker from "../date-picker/date-picker"
import { IconCalendarOutlined } from "../icons"
import PickerSelectorTrigger from "../picker-selector/picker-selector-trigger"
import { DatePickerSelectorProps } from "./types"

const prefixCls = getPrefixCls("date-picker-selector")

const DatePickerSelector: React.FC<DatePickerSelectorProps> = ({
    title,
    className,
    placeholderClassName,
    selectedValueClassName,
    popupProps,
    arrowStyle,
    arrowPosition,
    icon,
    value,
    editable = true,
    defaultValue,
    onChange,
}) => {
    const [visible, setVisible] = useState(false)
    const [curValue, setCurValue] = useState<PickerDate>()

    const mergedValue = useMemo(() => {
        return curValue ?? value ?? defaultValue
    }, [curValue, value, defaultValue])

    return (
        <PickerSelectorTrigger
            className={classNames(prefixCls, className)}
            placeholderClassName={placeholderClassName}
            selectedValueClassName={selectedValueClassName}
            arrowStyle={arrowStyle}
            arrowPosition={arrowPosition}
            editable={editable}
            selectedValueDisplay={mergedValue?.toLocaleDateString()}
            icon={
                icon ?? <IconCalendarOutlined className={`${prefixCls}-icon`} />
            }
            onClick={() => setVisible(true)}
        >
            <DatePicker
                {...popupProps}
                title={title}
                visible={visible}
                defaultValue={defaultValue}
                value={mergedValue}
                onChange={(value, extendedValue) => {
                    setCurValue(value)
                    onChange?.(value, extendedValue)
                    setVisible(false)
                }}
                onCancel={() => setVisible(false)}
            />
        </PickerSelectorTrigger>
    )
}

export default DatePickerSelector
