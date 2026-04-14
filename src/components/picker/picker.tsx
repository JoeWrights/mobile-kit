/* eslint-disable no-undef-init */
/* eslint-disable unicorn/no-useless-undefined */
import "./picker.less"

import { PickerView } from "antd-mobile"
import React, { useEffect, useState } from "react"

import { getPrefixCls } from "@/utils"

import { PopupContainer } from "../popup-container"
import {
    PickerMultipleProps,
    PickerProps,
    PickerSingleProps,
    PickerValue,
} from "./types"

const prefixCls = getPrefixCls("picker")

const renderMultiplePicker = (
    props: PickerMultipleProps,
    selectedValue: PickerValue[] | null,
    setSelectedValue: React.Dispatch<
        React.SetStateAction<PickerValue[] | null>
    >,
) => {
    const {
        value,
        visible,
        options,
        title,
        pickerViewProps,
        onCancel,
        onChange,
        ...popupProps
    } = props

    const displayValue = selectedValue ?? value
    const displayOptions = options ?? []
    const handleConfirm = () => {
        const confirmed = selectedValue ?? value ?? []
        onChange?.(confirmed)
    }

    return (
        <PopupContainer
            {...popupProps}
            className={prefixCls}
            contentClassName={`${prefixCls}__content`}
            visible={visible}
            title={title}
            onCancel={onCancel}
            onConfirm={handleConfirm}
        >
            <div className={`${prefixCls}__view`}>
                <PickerView
                    mouseWheel
                    {...pickerViewProps}
                    columns={displayOptions}
                    onChange={setSelectedValue}
                    value={displayValue}
                />
            </div>
        </PopupContainer>
    )
}

const renderSinglePicker = (
    props: PickerSingleProps,
    selectedValue: PickerValue[] | null,
    setSelectedValue: React.Dispatch<
        React.SetStateAction<PickerValue[] | null>
    >,
) => {
    const {
        value,
        visible,
        options,
        title,
        pickerViewProps,
        onCancel,
        onChange,
        ...popupProps
    } = props

    const displayValue =
        selectedValue ??
        (value === null || value === undefined ? undefined : [value])
    const displayOptions = [options ?? []]
    const handleConfirm = () => {
        const confirmed = selectedValue?.[0] ?? value ?? null
        onChange?.(confirmed)
    }

    return (
        <PopupContainer
            {...popupProps}
            className={prefixCls}
            contentClassName={`${prefixCls}__content`}
            visible={visible}
            title={title}
            onCancel={onCancel}
            onConfirm={handleConfirm}
        >
            <div className={`${prefixCls}__view`}>
                <PickerView
                    mouseWheel
                    {...pickerViewProps}
                    columns={displayOptions}
                    onChange={setSelectedValue}
                    value={displayValue}
                />
            </div>
        </PopupContainer>
    )
}

const Picker: React.FC<PickerProps> = (props) => {
    const [selectedValue, setSelectedValue] = useState<PickerValue[] | null>(
        null,
    )

    useEffect(() => {
        if (!props.visible) return
        setSelectedValue(null)
    }, [props.visible])

    if (props.multiple) {
        return renderMultiplePicker(props, selectedValue, setSelectedValue)
    }

    return renderSinglePicker(props, selectedValue, setSelectedValue)
}

export default Picker
