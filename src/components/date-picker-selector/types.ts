import { PickerDate } from "antd-mobile/es/components/date-picker/util"

import { DatePickerProps } from "../date-picker/types"
import { PickerSelectorTriggerProps } from "../picker-selector"
import { PopupContainerProps } from "../popup-container"

type TriggerProps = Pick<
    PickerSelectorTriggerProps,
    | "className"
    | "placeholderClassName"
    | "selectedValueClassName"
    | "arrowStyle"
    | "arrowPosition"
    | "editable"
    | "placeholder"
    | "icon"
>

export interface DatePickerSelectorProps
    extends TriggerProps,
        Omit<DatePickerProps, "className" | "value" | "onChange" | "visible"> {
    popupProps?: Omit<PopupContainerProps, "title" | "visible" | "onCancel">
    value?: PickerDate
    onChange?: (
        value?: PickerDate,
        extendedValue?: Record<string, unknown>,
    ) => void
}
