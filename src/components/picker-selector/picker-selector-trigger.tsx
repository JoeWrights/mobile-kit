import "./picker-selector-trigger.less"

import classNames from "classnames"
import React, { PropsWithChildren, useMemo } from "react"

import { NOOP_TEXT } from "@/constants"
import { getPrefixCls } from "@/utils"

import { useEditableFormContext } from "../editable-form"
import IconArrowFulfilled from "../icons/arrow-fulfilled"
import IconArrowOutlined from "../icons/arrow-outlined"
import { PickerSelectorTriggerProps } from "./types"

const prefixCls = getPrefixCls("picker-selector-trigger")

const PickerSelectorTrigger: React.FC<PropsWithChildren<
    PickerSelectorTriggerProps
>> = ({
    className,
    placeholderClassName,
    selectedValueClassName,
    arrowStyle,
    arrowPosition,
    editable = true,
    selectedValueDisplay,
    placeholder = "请选择",
    children,
    onClick,
}) => {
    const {
        selectorArrowPosition,
        selectorArrowStyle,
    } = useEditableFormContext()

    const mergedArrowPosition = useMemo(() => {
        return arrowPosition || selectorArrowPosition || "start"
    }, [arrowPosition, selectorArrowPosition])

    const mergedArrowStyle = useMemo(() => {
        return arrowStyle || selectorArrowStyle || "default"
    }, [arrowStyle, selectorArrowStyle])

    if (!editable) {
        return (
            <div className={classNames(prefixCls, className)}>
                <div className={classNames("picker-selector-selected-wrapper")}>
                    <div
                        className={classNames(
                            "picker-selector-selected-val-readonly",
                            selectedValueClassName,
                        )}
                    >
                        {selectedValueDisplay ?? NOOP_TEXT}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={classNames(prefixCls, className)}>
            <div
                className={classNames("picker-selector-selected-wrapper", {
                    "arrow-position-start": mergedArrowPosition === "start",
                    "arrow-position-end": mergedArrowPosition === "end",
                })}
                onClick={onClick}
            >
                <div
                    className={classNames(
                        "picker-selector-selected-val",
                        selectedValueClassName,
                        !selectedValueDisplay &&
                            classNames(
                                "picker-selector-selected-val-placeholder",
                                placeholderClassName,
                            ),
                    )}
                >
                    {selectedValueDisplay ?? placeholder}
                </div>
                {mergedArrowStyle === "default" ? (
                    <IconArrowFulfilled className="icon-arrow" />
                ) : (
                    <IconArrowOutlined className="icon-arrow" />
                )}
            </div>
            {children}
        </div>
    )
}

export default PickerSelectorTrigger
