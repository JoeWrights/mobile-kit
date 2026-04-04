import { ButtonProps, PopupProps } from "antd-mobile"

export interface PopupContainerProps extends PopupProps {
    title?: React.ReactNode
    className?: string
    headerClassName?: string
    contentClassName?: string
    footerClassName?: string
    visible?: boolean
    footerRender?: React.ReactNode
    footerButtonsProps?: ButtonProps & {
        buttonText?: string
    }
    confirmButtonPosition?: "top" | "bottom"
    showConfirmButton?: boolean
    showFooter?: boolean
    onCancel?: () => void
    onConfirm?: () => void
}
