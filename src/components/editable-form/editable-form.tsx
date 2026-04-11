/* eslint-disable react/no-array-index-key */
import "./editable-form.less"

import { Form } from "antd-mobile"
import classNames from "classnames"
import { keys } from "lodash-es"
import React, { useMemo } from "react"

import { getPrefixCls } from "@/utils"

import { EditableFormProvider } from "./context"
import FormGroup from "./form-group"
import { EditableFormContext, EditableFormProps } from "./types"

const prefixCls = getPrefixCls("editable-form")

const EditableForm: React.FC<EditableFormProps> = ({
    className,
    style,
    groupMap: groupMapProps,
    dataConfig,
    layout = "horizontal",
    editable = true,
    formRef,
    loading = false,
    withoutFormItem = false,
    hiddenItemByDisplayNone = false,
    ignoreDefaultRequiredRule = false,
    requiredMaskPosition = "end",
    formItemAlign = "start",
    selectorArrowPosition = "end",
    selectorArrowStyle = "default",
    lastGroupItemWithoutPaddingBottom = false,
    removeRequiredIfReadOnly = false,
    labelEllipsis = true,
    children,
    ...props
}) => {
    const groupMap = useMemo(() => {
        if (!groupMapProps) {
            return [
                {
                    rows: [keys(dataConfig)],
                },
            ]
        }

        return groupMapProps
    }, [dataConfig, groupMapProps])

    const contextValue: EditableFormContext = {
        formRef,
        editable,
        labelEllipsis,
        withoutFormItem,
        hiddenItemByDisplayNone,
        ignoreDefaultRequiredRule,
        requiredMaskPosition,
        dataConfig,
        formItemAlign,
        selectorArrowPosition,
        selectorArrowStyle,
        lastGroupItemWithoutPaddingBottom,
        removeRequiredIfReadOnly,
    }

    // TODO: 添加表单的loading状态

    return (
        <EditableFormProvider value={contextValue}>
            <Form
                {...props}
                className={classNames(prefixCls, className)}
                form={formRef}
                layout={layout}
                style={style}
            >
                {groupMap.map((group, groupIndex) => {
                    return (
                        <FormGroup
                            key={`${group.titleId}-${groupIndex}`}
                            group={group}
                        />
                    )
                })}
                {children}
            </Form>
        </EditableFormProvider>
    )
}

export default EditableForm
