/* eslint-disable no-undef-init */
/* eslint-disable unicorn/no-useless-undefined */
import "./picker.less"

import { PickerView } from "antd-mobile"
import { isNil } from "lodash-es"
import React, { useCallback, useEffect, useMemo, useState } from "react"

import { getPrefixCls } from "@/utils"

import { PopupContainer } from "../popup-container"
import { PickerProps, PickerValue } from "./types"

const prefixCls = getPrefixCls("picker")

const Picker: React.FC<PickerProps> = ({
    value,
    visible,
    options = [],
    title,
    pickerViewProps,
    onCancel,
    onChange,
    ...props
}) => {
    const [selectedValue, setSelectedValue] = useState<PickerValue>(null)

    const displayValue = useMemo(() => {
        let val: PickerValue[] | undefined = undefined
        if (!isNil(selectedValue)) {
            val = [selectedValue]
        } else if (value) {
            val = Array.isArray(value) ? value : [value]
        }
        return val
    }, [selectedValue, value])

    const handleConfirm = useCallback(() => {
        let confirmed: PickerValue | PickerValue[] = null
        if (!isNil(selectedValue)) {
            confirmed = selectedValue
        } else if (value) {
            confirmed = Array.isArray(value) ? value : [value]
        }
        onChange?.(confirmed)
    }, [onChange, selectedValue, value])

    useEffect(() => {
        if (!visible) return
        setSelectedValue(null)
    }, [visible])

    return (
        <PopupContainer
            {...props}
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
                    columns={[options]}
                    onChange={(val) => setSelectedValue(val?.[0])}
                    value={displayValue}
                />
            </div>
        </PopupContainer>
    )
}

export default Picker
