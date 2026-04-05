/* eslint-disable unicorn/no-useless-undefined */
import "./picker.less"

import { PickerView } from "antd-mobile"
import { isUndefined } from "lodash-es"
import React, { useCallback, useEffect, useMemo, useState } from "react"

import { getPrefixCls } from "@/utils"

import { PopupContainer } from "../popup-container"
import { PickerProps, PickerValue } from "./types"

const prefixCls = getPrefixCls("picker-container-wrapper")

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
        return !isUndefined(selectedValue) ? [selectedValue] : value
    }, [selectedValue, value])

    const handleConfirm = useCallback(() => {
        const confirmed = !isUndefined(selectedValue)
            ? selectedValue
            : value?.[0] || null
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
            contentClassName={getPrefixCls("picker-content-wrapper")}
            visible={visible}
            title={title}
            onCancel={onCancel}
            onConfirm={handleConfirm}
        >
            <div className={getPrefixCls("picker-view-content-wrapper")}>
                <PickerView
                    {...pickerViewProps}
                    columns={[options]}
                    mouseWheel
                    onChange={(val) => setSelectedValue(val?.[0])}
                    value={displayValue}
                />
            </div>
        </PopupContainer>
    )
}

export default Picker
