import { PickerOption, PickerValue } from "../picker/types"
import { PopupContainerProps } from "../popup-container"

export interface PickerSelectorTriggerProps {
    className?: string
    placeholderClassName?: string
    selectedValueClassName?: string
    arrowStyle?: "default" | "filled"
    arrowPosition?: "start" | "end"
    editable?: boolean
    selectedValueDisplay?: React.ReactNode
    placeholder?: string
    icon?: React.ReactNode
    onClick?: () => void
}

interface PickerSelectorCommonProps
    extends PopupContainerProps,
        Omit<PickerSelectorTriggerProps, "onClick"> {
    title?: string
    popupProps?: Omit<PopupContainerProps, "title" | "visible" | "onCancel">
}

export interface PickerSelectorSingleProps extends PickerSelectorCommonProps {
    multiple?: false
    value?: PickerValue
    options: PickerOption[]
    onChange?: (value: PickerValue, extendedValue?: Record<string, any>) => void
    filterOption?: (
        options: PickerOption[],
        formValues: Record<string, any>,
    ) => PickerOption[]
}

export interface PickerSelectorMultipleProps extends PickerSelectorCommonProps {
    multiple: true
    value?: PickerValue[]
    options: PickerOption[][]
    onChange?: (
        value: PickerValue[],
        extendedValue?: Record<string, any>,
    ) => void
    filterOption?: (
        options: PickerOption[][],
        formValues: Record<string, any>,
    ) => PickerOption[][]
}

export type PickerSelectorProps =
    | PickerSelectorSingleProps
    | PickerSelectorMultipleProps
