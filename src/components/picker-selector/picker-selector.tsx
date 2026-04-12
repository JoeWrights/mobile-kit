import "./picker-selector.less"

import classNames from "classnames"
import React, { useEffect, useMemo, useState } from "react"

import { getPrefixCls } from "@/utils"

import { useEditableFormContext } from "../editable-form/context"
import Picker from "../picker/picker"
import { PickerValueUnion } from "../picker/types"
import PickerSelectorTrigger from "./picker-selector-trigger"
import { PickerSelectorProps } from "./types"

const prefixCls = getPrefixCls("picker-selector")

const PickerSelector: React.FC<PickerSelectorProps> = ({
    title,
    className,
    placeholderClassName,
    selectedValueClassName,
    popupProps,
    arrowStyle,
    arrowPosition,
    editable = true,
    value,
    icon,
    options,
    onChange,
    filterOption,
}) => {
    const { formRef } = useEditableFormContext()

    const [visible, setVisible] = useState(false)
    const [curValue, setCurValue] = useState<PickerValueUnion | undefined>(
        value,
    )

    const mergedOptions = useMemo(() => {
        if (filterOption) {
            return filterOption(options, formRef?.getFieldsValue() || {})
        }
        return options
    }, [filterOption, options, formRef])

    const selectedValueLabel = useMemo(() => {
        return options.find((option) => option.value === curValue)?.label
    }, [curValue, options])

    useEffect(() => {
        setCurValue(value)
    }, [value])

    return (
        <PickerSelectorTrigger
            className={classNames(prefixCls, className)}
            placeholderClassName={placeholderClassName}
            selectedValueClassName={selectedValueClassName}
            arrowStyle={arrowStyle}
            arrowPosition={arrowPosition}
            editable={editable}
            selectedValueDisplay={selectedValueLabel}
            icon={icon}
            onClick={() => setVisible(true)}
        >
            <Picker
                bodyStyle={{ minHeight: "35vh" }}
                {...popupProps}
                title={title}
                visible={visible}
                value={curValue}
                options={mergedOptions}
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

export default PickerSelector
