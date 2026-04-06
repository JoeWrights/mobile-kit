/* eslint-disable react/require-default-props */
import React from "react"

export interface EditableFormFieldProps {
    description?: React.ReactNode
}

/**
 * 包装组件，用于在表单项中显示描述
 * @param Component 要包装的组件
 * @returns 包装后的组件
 */
export function withComponent<
    P extends {
        onChange?: (...args: any[]) => void
    }
>(
    Component: React.ComponentType<P>,
): React.ComponentType<P & EditableFormFieldProps> {
    const WrappedComponent = (props: P & EditableFormFieldProps) => {
        const { description, ...rest } = props

        return (
            <div>
                {description && (
                    <div className="form-item-description">{description}</div>
                )}
                <Component {...(rest as P)} />
            </div>
        )
    }

    return WrappedComponent
}

type CachedComponentType = React.ComponentType<Record<string, unknown>>
const WRAPPED_COMPONENT_CACHE = new WeakMap<
    Record<string, unknown>,
    CachedComponentType
>()

/**
 * 缓存包装组件，用于在表单项中显示描述
 * @param Component 要包装的组件
 * @returns 包装后的组件
 */
export function withComponentCached<
    P extends {
        onChange?: (...args: any[]) => void
    }
>(
    Component: React.ComponentType<P>,
): React.ComponentType<P & EditableFormFieldProps> {
    const cached = WRAPPED_COMPONENT_CACHE.get(
        (Component as unknown) as Record<string, unknown>,
    )

    if (cached) {
        return cached as React.ComponentType<P & EditableFormFieldProps>
    }

    const Wrapped = withComponent(Component)
    WRAPPED_COMPONENT_CACHE.set(
        (Component as unknown) as Record<string, unknown>,
        Wrapped as CachedComponentType,
    )
    return Wrapped as React.ComponentType<P & EditableFormFieldProps>
}
