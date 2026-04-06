import { PickerViewProps } from "antd-mobile"
import { PickerValue as _PickerValue } from "antd-mobile/es/components/picker-view"

import { PopupContainerProps } from "../popup-container"

export interface PickerOption {
    label: string
    value: string
}

export interface PickerProps extends PopupContainerProps {
    value?: PickerValue | PickerValue[]
    options?: PickerOption[]
    pickerViewProps?: Omit<PickerViewProps, "columns" | "value" | "onChange">
    onChange?: (value: PickerValue | PickerValue[]) => void
}

export type PickerValue = _PickerValue
export type PickerValueUnion = PickerValue | PickerValue[]
