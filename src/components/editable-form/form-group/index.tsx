/* eslint-disable react/no-array-index-key */
import "./index.less"

import { Form } from "antd-mobile"
import classNames from "classnames"
import { isEmpty, isNil } from "lodash-es"
import React, { useMemo } from "react"

import { getPrefixCls } from "@/utils"

import { useEditableFormContext } from "../context"
import FormItems from "../form-items"
import { GroupMapItem } from "../types"

const prefixCls = getPrefixCls("editable-form-group")

export interface FormGroupProps {
    group: GroupMapItem
}

const FormGroup: React.FC<FormGroupProps> = ({ group }) => {
    const { icon, title, rows, titleId, className, noPadding = false } = group
    const {
        dataConfig,
        lastGroupItemWithoutPaddingBottom,
        editable,
    } = useEditableFormContext()

    // 是否存在动态可见的表单项
    const hasDynamicVisibleFields = useMemo(() => {
        if (!dataConfig) return false

        return rows.some((row) => {
            return row.some((fieldKey) => {
                const itemConfig = dataConfig[fieldKey]
                return typeof itemConfig?.visible === "function"
            })
        })
    }, [dataConfig, rows])

    // 是否所有表单项都只读
    const isAllFieldsReadOnly = useMemo(() => {
        if (!dataConfig) return false
        if (!editable) return true

        return rows.every((row) => {
            return row.every((fieldKey) => {
                const itemConfig = dataConfig[fieldKey]
                return itemConfig.readOnly === true
            })
        })
    }, [dataConfig, editable, rows])

    // 是否第一个表单项只读
    const isFirstFieldReadOnly = useMemo(() => {
        if (!dataConfig) return false
        if (!editable) return true

        const firstFieldKey = rows[0]?.[0]

        return dataConfig[firstFieldKey]?.readOnly === true
    }, [dataConfig, editable, rows])

    const groupContent = rows
        .map((row, rowIndex) => {
            return <FormItems key={rowIndex} items={row} />
        })
        .filter((row) => !isNil(row))

    if (isEmpty(groupContent)) return null

    const formGroupContentWrapper = (
        <div
            className={classNames(
                prefixCls,
                className,
                noPadding && "no-padding",
            )}
        >
            {title || icon ? (
                <div className={`${prefixCls}-title`} id={titleId}>
                    {icon}
                    {title ? (
                        <div
                            className={classNames(
                                `${prefixCls}-title-text`,
                                isFirstFieldReadOnly && "bottom-gap",
                            )}
                        >
                            {title}
                        </div>
                    ) : null}
                </div>
            ) : null}

            <div
                className={classNames(`${prefixCls}-content`, {
                    [`${prefixCls}-content-readonly`]: isAllFieldsReadOnly,
                    "last-item-without-padding-bottom": lastGroupItemWithoutPaddingBottom,
                })}
            >
                {groupContent}
            </div>
        </div>
    )

    if (hasDynamicVisibleFields) {
        return (
            <Form.Item noStyle>
                {(formRef) => {
                    const formValues = formRef.getFieldsValue(true)
                    // 检查当前字段是否都不可见
                    let hasVisibleFields = false

                    for (const row of rows) {
                        for (const fieldKey of row) {
                            const itemConfig = dataConfig?.[fieldKey]

                            if (!itemConfig) continue

                            // 检查formItemProps.hidden
                            if (itemConfig.formItemProps?.hidden) continue

                            const { visible = true } = itemConfig

                            if (typeof visible === "boolean") {
                                if (visible) {
                                    hasVisibleFields = true
                                    break
                                }
                                continue
                            }

                            if (typeof visible === "function") {
                                try {
                                    if (visible(formValues)) {
                                        hasVisibleFields = true
                                        break
                                    }
                                } catch {
                                    hasVisibleFields = true
                                    break
                                }
                            }
                        }

                        if (hasVisibleFields) break
                    }

                    if (!hasVisibleFields) return null

                    return formGroupContentWrapper
                }}
            </Form.Item>
        )
    }

    return formGroupContentWrapper
}

export default FormGroup
