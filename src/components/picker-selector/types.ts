import { PickerOption, PickerValue } from "../picker/types"
import { PopupContainerProps } from "../popup-container"

export interface PickerSelectorProps extends PopupContainerProps {
    title: string
    className?: string
    placeholderClassName?: string
    selectedValueClassName?: string
    popupProps?: Omit<PopupContainerProps, "title" | "visible" | "onCancel">
    arrowStyle?: "default" | "outlined"
    arrowPosition?: "start" | "end"
    editable?: boolean
    value?: PickerValue | PickerValue[]
    options: PickerOption[]
    onChange?: (
        value: PickerValue | PickerValue[],
        extendedValue?: Record<string, any>,
    ) => void
    filterOption?: (
        options: PickerOption[],
        formValues: Record<string, any>,
    ) => PickerOption[]
}
