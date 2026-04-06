/* eslint-disable react/require-default-props */
import React from "react"

import { useEditableFormContext } from "../context"

export type AfterChangeHandler<T = any> = (
    value: T,
    extendedValue?: Partial<T>,
) => void

export type BeforeChangeHandler<T = any> = (
    value: T,
    extendedValue?: Partial<T>,
) => boolean

export interface EditableFormFieldProps<T = any> {
    beforeChange?: BeforeChangeHandler<T>
    afterChange?: AfterChangeHandler<T>
}

/**
 * HOC，用于在组件中处理表单值的变化，并触发beforeChange和afterChange回调
 * @param Component 要包装的组件
 * @returns 包装后的组件
 * @example
 * const WrappedInput = withCompProps(Input)
 * <WrappedInput />
 */
export function withCompProps<
    P extends {
        onChange?: (...args: any[]) => void
    }
>(
    Component: React.ComponentType<P>,
): React.ComponentType<P & EditableFormFieldProps> {
    const WrappedComponent = (props: P & EditableFormFieldProps) => {
        const { beforeChange, afterChange, onChange, ...rest } = props
        const { formRef } = useEditableFormContext()

        const handleChange = (value: any, extendedValue?: Partial<any>) => {
            if (
                beforeChange &&
                !beforeChange(value, {
                    ...formRef?.getFieldsValue(),
                })
            ) {
                return
            }

            onChange?.(value, extendedValue)

            if (afterChange) {
                afterChange(value, {
                    ...formRef?.getFieldsValue(),
                })
            }
        }

        return <Component {...(rest as P)} onChange={handleChange} />
    }

    return WrappedComponent
}
