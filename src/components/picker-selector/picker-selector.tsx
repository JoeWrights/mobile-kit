import "./picker-selector.less"

import classNames from "classnames"
import { isNil } from "lodash-es"
import React, { useEffect, useMemo, useState } from "react"

import { getPrefixCls } from "@/utils"

import { useEditableFormContext } from "../editable-form/context"
import Picker from "../picker/picker"
import { PickerValueUnion } from "../picker/types"
import PickerSelectorTrigger from "./picker-selector-trigger"
import { PickerSelectorProps } from "./types"

const prefixCls = getPrefixCls("picker-selector")

const PickerSelector: React.FC<PickerSelectorProps> = (props) => {
    const { formRef } = useEditableFormContext()
    const editable = props.editable ?? true
    const { multiple, filterOption, options } = props

    const [visible, setVisible] = useState(false)
    const [curValue, setCurValue] = useState<PickerValueUnion | undefined>(
        props.value,
    )

    const mergedSingleOptions = useMemo(() => {
        if (multiple) return []

        const formValues = formRef?.getFieldsValue() || {}
        return filterOption ? filterOption(options, formValues) : options
    }, [filterOption, formRef, multiple, options])

    const mergedMultipleOptions = useMemo(() => {
        if (!multiple) return []

        const formValues = formRef?.getFieldsValue() || {}
        return filterOption ? filterOption(options, formValues) : options
    }, [filterOption, formRef, multiple, options])

    const selectedValueLabel = useMemo(() => {
        if (multiple) {
            if (!Array.isArray(curValue)) return
            const selectedLabels = curValue
                .map((value, index) => {
                    const columnOptions = mergedMultipleOptions[index]
                    return columnOptions?.find(
                        (option) => option.value === value,
                    )?.label
                })
                .filter((label): label is string => !isNil(label))

            return selectedLabels.length > 0
                ? selectedLabels.join(" / ")
                : undefined
        }

        if (Array.isArray(curValue)) return

        return mergedSingleOptions.find((option) => option.value === curValue)
            ?.label
    }, [curValue, mergedMultipleOptions, mergedSingleOptions, multiple])

    useEffect(() => {
        setCurValue(props.value)
    }, [props.value])

    return (
        <PickerSelectorTrigger
            className={classNames(prefixCls, props.className)}
            placeholderClassName={props.placeholderClassName}
            selectedValueClassName={props.selectedValueClassName}
            arrowStyle={props.arrowStyle}
            arrowPosition={props.arrowPosition}
            editable={editable}
            selectedValueDisplay={selectedValueLabel}
            icon={props.icon}
            onClick={() => setVisible(true)}
        >
            {multiple ? (
                <Picker
                    bodyStyle={{ minHeight: "35vh" }}
                    {...props.popupProps}
                    title={props.title}
                    visible={visible}
                    multiple
                    value={Array.isArray(curValue) ? curValue : undefined}
                    options={mergedMultipleOptions}
                    onChange={(value, extendedValue) => {
                        setCurValue(value)
                        props.onChange?.(value, extendedValue)
                        setVisible(false)
                    }}
                    onCancel={() => setVisible(false)}
                />
            ) : (
                <Picker
                    bodyStyle={{ minHeight: "35vh" }}
                    {...props.popupProps}
                    title={props.title}
                    visible={visible}
                    value={Array.isArray(curValue) ? undefined : curValue}
                    options={mergedSingleOptions}
                    onChange={(value, extendedValue) => {
                        setCurValue(value)
                        props.onChange?.(value, extendedValue)
                        setVisible(false)
                    }}
                    onCancel={() => setVisible(false)}
                />
            )}
        </PickerSelectorTrigger>
    )
}

export default PickerSelector
