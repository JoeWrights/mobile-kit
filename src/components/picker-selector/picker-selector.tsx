import "./picker-selector.less"

import classNames from "classnames"
import React, { useEffect, useMemo, useState } from "react"

import { NOOP_TEXT } from "@/constants"
import { getPrefixCls } from "@/utils"

import { useEditableFormContext } from "../editable-form/context"
import Picker from "../picker/picker"
import { PickerValueUnion } from "../picker/types"
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
    options,
    onChange,
    filterOption,
}) => {
    const {
        formRef,
        selectorArrowPosition,
        selectorArrowStyle,
    } = useEditableFormContext()

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

    const mergedArrowPosition = useMemo(() => {
        return arrowPosition || selectorArrowPosition || "start"
    }, [arrowPosition, selectorArrowPosition])

    const mergedArrowStyle = useMemo(() => {
        return arrowStyle || selectorArrowStyle || "default"
    }, [arrowStyle, selectorArrowStyle])

    const selectedValueLabel = useMemo(() => {
        return options.find((option) => option.value === curValue)?.label
    }, [curValue, options])

    useEffect(() => {
        setCurValue(value)
    }, [value])

    if (!editable) {
        return (
            <div className={classNames(prefixCls, className)}>
                <div className={classNames("picker-selector-selected-wrapper")}>
                    <div
                        className={classNames(
                            "picker-selector-selected-val-readonly",
                            selectedValueClassName,
                        )}
                    >
                        {selectedValueLabel ?? NOOP_TEXT}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={classNames(prefixCls, className)}>
            <div
                className={classNames("picker-selector-selected-wrapper", {
                    "arrow-position-start": mergedArrowPosition === "start",
                    "arrow-position-end": mergedArrowPosition === "end",
                })}
                onClick={() => setVisible(true)}
            >
                <div
                    className={classNames(
                        "picker-selector-selected-val",
                        selectedValueClassName,
                        !selectedValueLabel &&
                            classNames(
                                "picker-selector-selected-val-placeholder",
                                placeholderClassName,
                            ),
                    )}
                >
                    {selectedValueLabel ?? "请选择"}
                </div>
            </div>

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
        </div>
    )
}

export default PickerSelector
