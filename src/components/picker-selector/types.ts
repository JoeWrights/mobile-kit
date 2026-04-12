import { PickerOption, PickerValue } from "../picker/types"
import { PopupContainerProps } from "../popup-container"

export interface PickerSelectorTriggerProps {
    className?: string
    placeholderClassName?: string
    selectedValueClassName?: string
    arrowStyle?: "default" | "outlined"
    arrowPosition?: "start" | "end"
    editable?: boolean
    selectedValueDisplay?: React.ReactNode
    placeholder?: string
    onClick?: () => void
}

export interface PickerSelectorProps
    extends PopupContainerProps,
        Omit<PickerSelectorTriggerProps, "onClick"> {
    title?: string
    popupProps?: Omit<PopupContainerProps, "title" | "visible" | "onCancel">
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
