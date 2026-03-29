import type { ButtonProps, PopupProps } from "antd-mobile";

export interface PopupContainerProps extends PopupProps {
  title?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  footerClassName?: string;
  visible?: boolean;
  footerRender?: React.ReactNode;
  footerButtonsProps?: ButtonProps & {
    buttonText?: string;
  }
  confirmButtonPosition?: 'top' | 'bottom';
  needConfirmButton?: boolean;
  needFooter?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}