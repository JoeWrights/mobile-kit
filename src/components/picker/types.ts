import { PickerViewProps } from "antd-mobile"
import { PickerValue as _PickerValue } from "antd-mobile/es/components/picker-view"

import { PopupContainerProps } from "../popup-container"

export interface PickerOption {
    label: string
    value: string
}

interface PickerCommonProps extends PopupContainerProps {
    pickerViewProps?: Omit<PickerViewProps, "columns" | "value" | "onChange">
}

export interface PickerSingleProps extends PickerCommonProps {
    multiple?: false
    value?: PickerValue
    options?: PickerOption[]
    onChange?: (value: PickerValue, extendedValue?: Record<string, any>) => void
}

export interface PickerMultipleProps extends PickerCommonProps {
    multiple: true
    value?: PickerValue[]
    options?: PickerOption[][]
    onChange?: (
        value: PickerValue[],
        extendedValue?: Record<string, any>,
    ) => void
}

export type PickerProps = PickerSingleProps | PickerMultipleProps

export type PickerValue = _PickerValue
export type PickerValueUnion = PickerValue | PickerValue[]
