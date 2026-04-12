import { PickerDate } from "antd-mobile/es/components/date-picker/util"

import { DatePickerProps } from "../date-picker/types"
import { PickerSelectorTriggerProps } from "../picker-selector"
import { PopupContainerProps } from "../popup-container"

export interface DatePickerSelectorProps
    extends PopupContainerProps,
        Omit<DatePickerProps, "value" | "onChange">,
        Omit<PickerSelectorTriggerProps, "onClick"> {
    popupProps?: Omit<PopupContainerProps, "title" | "visible" | "onCancel">
    value?: PickerDate
    onChange?: (
        value?: PickerDate,
        extendedValue?: Record<string, unknown>,
    ) => void
}
