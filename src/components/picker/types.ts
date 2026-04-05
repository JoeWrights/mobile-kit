import { PickerViewProps } from "antd-mobile"
import { PickerValue as _PickerValue } from "antd-mobile/es/components/picker-view"

import { PopupContainerProps } from "../popup-container"

export interface PickerOption {
    label: string
    value: string
}

export interface PickerProps extends PopupContainerProps {
    value?: PickerValue[]
    options?: PickerOption[]
    pickerViewProps?: PickerViewProps
    onChange?: (value?: PickerValue) => void
}

export type PickerValue = _PickerValue
