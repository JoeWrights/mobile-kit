import { Toast } from "antd-mobile"
import { FormInstance } from "antd-mobile/es/components/form"
import { ToastProps } from "antd-mobile/es/components/toast/toast"
import { get } from "lodash-es"

import { BaseFormItemConfig, CustomFormItemConfig } from "./types"

/**
 * 表单验证
 * @param form 表单实例
 * @param options 选项
 * @param options.toastErrorMessage 是否显示错误信息
 * @param options.toastProps 错误信息提示框的属性
 * @returns 表单值
 */
export async function formValidate(
    form: FormInstance,
    options?: {
        toastErrorMessage?: boolean
        toastProps?: ToastProps
    },
) {
    const { toastErrorMessage = true, toastProps } = options ?? {}

    try {
        const values = await form.validateFields()
        return values
    } catch (error) {
        const firstErrorField = get(error, ["errorFields", 0, "name", 0])
        const firstErrorMessage = get(error, ["errorFields", 0, "errors", 0])

        if (firstErrorField) {
            const formItem = document.querySelector(
                `.adm-form-item[data-form-key="${firstErrorField}"]`,
            )

            if (formItem) {
                if (toastErrorMessage) {
                    Toast.show({
                        content: firstErrorMessage,
                        position: "center",
                        ...toastProps,
                    })
                }

                formItem.scrollIntoView({ behavior: "smooth", block: "center" })
            }

            throw error
        }
    }
}

/**
 * 创建表单组件配置
 * @param config 表单组件配置
 * @returns 表单组件配置
 */
export function createFormComponentConfig<
    T,
    C extends React.JSXElementConstructor<any>
>(config: CustomFormItemConfig<C> & BaseFormItemConfig<T>) {
    return config
}
