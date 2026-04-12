import { DatePickerViewProps } from "antd-mobile"
import { PickerDate } from "antd-mobile/es/components/date-picker/util"

import { PopupContainerProps } from "../popup-container"

export interface DatePickerProps
    extends PopupContainerProps,
        Omit<
            DatePickerViewProps,
            "value" | "onChange" | "style" | "className"
        > {
    value?: PickerDate
    onChange?: (
        value?: PickerDate,
        extendedValue?: Record<string, unknown>,
    ) => void
}
