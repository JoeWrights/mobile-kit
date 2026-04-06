import "./index.less"

import { Ellipsis, Form } from "antd-mobile"
import {
    FormItemProps,
    RuleObject,
    RuleRender,
} from "antd-mobile/es/components/form"
import classNames from "classnames"
import { isEmpty, isNil } from "lodash-es"
import React from "react"

import { getPrefixCls } from "@/utils"

import { useEditableFormContext } from "../context"
import { fieldMap, fieldRequiredMessage } from "../fields"
import { withComponentCached } from "./with-component"

const prefixCls = getPrefixCls("editable-form-item")

export interface FormItemsProps {
    items: string[]
}

const renderLabel = ({
    label,
    labelSuffix,
    labelEllipsis,
    labelClassName,
    required,
    requiredMaskPosition,
}: {
    label: React.ReactNode
    labelSuffix?: React.ReactNode
    labelEllipsis?: boolean
    labelClassName?: string
    required?: boolean
    requiredMaskPosition?: "start" | "end"
}) => {
    let labelContent = label

    switch (typeof label) {
        case "string":
            if (labelEllipsis) {
                labelContent = <Ellipsis content={label} />
            }
            break
        case "object":
            if (React.isValidElement(label)) {
                labelContent = label
            }
            break
        default:
            break
    }

    return (
        <div className={classNames("form-label-wrapper", labelClassName)}>
            <div className="form-label-content">
                {labelContent}
                {requiredMaskPosition === "end" && required && (
                    <span className="required-mask">*</span>
                )}
            </div>
            {labelSuffix && <span className="label-suffix">{labelSuffix}</span>}
        </div>
    )
}

const FormItems: React.FC<FormItemsProps> = ({ items }) => {
    const {
        dataConfig,
        ignoreDefaultRequiredRule: fromIgnoreDefaultRequiredRule,
        editable,
        labelEllipsis,
        withoutFormItem,
        hiddenItemByDisplayNone,
        requiredMaskPosition,
        formItemAlign,
        selectorArrowPosition,
        removeRequiredIfReadOnly,
    } = useEditableFormContext()

    const itemsContent = items
        .map((item) => {
            const itemConfig = dataConfig?.[item]

            if (!itemConfig) return null

            const {
                label,
                labelSuffix,
                labelClassName,
                readOnly = false,
                required,
                requiredRule,
                visible = true,
                ignoreDefaultRequiredRule,
                formItemProps,
                layout = "horizontal",
                verticalLayoutNoPadding = false,
                description,
                fullWidth = false,
                alignItems = "center",
                compProps,
            } = itemConfig

            const mergedRequired =
                removeRequiredIfReadOnly && !editable ? false : required
            const mergedIgnoreDefaultRequiredRule =
                ignoreDefaultRequiredRule ?? fromIgnoreDefaultRequiredRule

            const isCustomComponent = "component" in itemConfig
            const Component = isCustomComponent
                ? itemConfig.component
                : fieldMap[itemConfig.fieldType] || (() => null)

            if (!Component) return null

            const formattedRules: (RuleObject | RuleRender)[] = []
            const compEditable = !readOnly && editable
            const formItemMessageVariables: Record<string, any> =
                formItemProps?.messageVariables ?? {}
            const labelVariable = formItemMessageVariables.label

            if (formItemProps?.rules) {
                formattedRules.push(...formItemProps.rules)
            }

            const isVisibleFunction = typeof visible === "function"
            const isDescriptionFunction = typeof description === "function"
            const isLabelFunction = typeof label === "function"
            const isLabelSuffixFunction = typeof labelSuffix === "function"
            const isRequiredFunction = typeof mergedRequired === "function"
            const isAlignItemsFunction = typeof alignItems === "function"

            const needFormItemWrapper =
                isVisibleFunction ||
                isDescriptionFunction ||
                isLabelFunction ||
                isLabelSuffixFunction ||
                isRequiredFunction ||
                isAlignItemsFunction

            const mergedFormItemProps: FormItemProps = {
                name: item,
                validateFirst: true,
                ...formItemProps,
                messageVariables: {
                    ...formItemMessageVariables,
                    label:
                        labelVariable ??
                        (typeof label === "string" ? label : item),
                },
                rules: formattedRules,
            }

            const formItemRender = ({
                v,
                desc,
                r,
                l,
                ls,
                ai,
            }: {
                v: boolean
                desc?: React.ReactNode
                r?: boolean
                l?: React.ReactNode
                ls?: React.ReactNode
                ai?: React.CSSProperties["alignItems"]
            }) => {
                if (!v && !hiddenItemByDisplayNone) return null

                const placeholder =
                    fieldRequiredMessage[itemConfig.fieldType ?? "input"]
                const labelIsEmpty = isNil(l) || isEmpty(l)

                const formattedFormItemProps = {
                    ...mergedFormItemProps,
                    required: r,
                    label: renderLabel({
                        label: l,
                        labelSuffix: ls,
                        labelEllipsis,
                        labelClassName,
                        required: r,
                        requiredMaskPosition,
                    }),
                }

                if (r && !mergedIgnoreDefaultRequiredRule) {
                    const message = isCustomComponent
                        ? `请输入${label}`
                        : `${
                              fieldRequiredMessage[itemConfig.fieldType]
                          }\${label}`
                    formattedRules.push({
                        message,
                        ...requiredRule,
                        required: true,
                    })
                }

                const WrappedComponent = withComponentCached<any>(Component)

                return withoutFormItem ? (
                    <WrappedComponent
                        placeholder={placeholder}
                        {...compProps}
                        editable={editable}
                        formItemProps={formattedFormItemProps}
                        readOnly={!compEditable}
                    />
                ) : (
                    <Form.Item
                        key={item}
                        {...formattedFormItemProps}
                        className={classNames(
                            prefixCls,
                            compEditable
                                ? `${prefixCls}-editable`
                                : `${prefixCls}-readonly`,
                            formItemProps?.className,
                            formItemProps?.hidden ? "hidden" : "visible",
                            `form-item-align-${formItemAlign}`,
                            `form-item-layout-${layout}`,
                            `form-item-align-items-${ai}`,
                            verticalLayoutNoPadding &&
                                "form-item-layout-vertical-no-padding",
                            fullWidth && "form-item-full-width",
                            {
                                "form-item-label-is-empty": labelIsEmpty,
                                "required-mask-start":
                                    requiredMaskPosition === "start",
                                "required-mask-end":
                                    requiredMaskPosition === "end",
                                "picker-selector-arrow-position-start":
                                    selectorArrowPosition === "start",
                                "picker-selector-arrow-position-end":
                                    selectorArrowPosition === "end",
                            },
                        )}
                        data-form-key={item}
                    >
                        <WrappedComponent
                            placeholder={placeholder}
                            {...compProps}
                            description={desc}
                            editable={editable}
                            formItemProps={formattedFormItemProps}
                            readOnly={!compEditable}
                        />
                    </Form.Item>
                )
            }

            if (needFormItemWrapper) {
                return (
                    <Form.Item
                        key={item}
                        noStyle
                        shouldUpdate={(preValues, currentValues) => {
                            if (
                                mergedFormItemProps?.shouldUpdate ||
                                mergedFormItemProps.description
                            ) {
                                return true
                            }

                            const visibleChanged = isVisibleFunction
                                ? visible(preValues) !== visible(currentValues)
                                : false
                            const descriptionChanged = isDescriptionFunction
                                ? description(preValues) !==
                                  description(currentValues)
                                : false
                            const requiredChanged = isRequiredFunction
                                ? mergedRequired(preValues) !==
                                  mergedRequired(currentValues)
                                : false
                            const labelChanged = isLabelFunction
                                ? label(preValues) !== label(currentValues)
                                : false
                            const labelSuffixChanged = isLabelSuffixFunction
                                ? labelSuffix(preValues) !==
                                  labelSuffix(currentValues)
                                : false

                            return (
                                visibleChanged ||
                                descriptionChanged ||
                                requiredChanged ||
                                labelChanged ||
                                labelSuffixChanged
                            )
                        }}
                    >
                        {(formRef) => {
                            const formValues = formRef.getFieldsValue(true)
                            const v = isVisibleFunction
                                ? visible(formValues)
                                : visible
                            const desc = isDescriptionFunction
                                ? description(formValues)
                                : description
                            const r = isRequiredFunction
                                ? mergedRequired(formValues)
                                : !!mergedRequired
                            const l = isLabelFunction
                                ? label(formValues)
                                : label
                            const ls = isLabelSuffixFunction
                                ? labelSuffix(formValues)
                                : labelSuffix
                            const ai = isAlignItemsFunction
                                ? alignItems(formValues)
                                : alignItems

                            return formItemRender({
                                v,
                                desc,
                                r,
                                l,
                                ls,
                                ai,
                            })
                        }}
                    </Form.Item>
                )
            }

            return formItemRender({
                v: visible,
                r: !!mergedRequired,
                desc: description,
                l: label,
                ls: labelSuffix,
                ai: alignItems,
            })
        })
        ?.filter((item) => !isNil(item))

    if (isEmpty(itemsContent)) return null

    return itemsContent
}

export default FormItems
