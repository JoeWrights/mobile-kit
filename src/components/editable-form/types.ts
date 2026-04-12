import {
    FormItemProps,
    FormProps,
    RuleObject,
} from "antd-mobile/es/components/form"

import { fieldMap } from "./fields"

export interface BaseFormItemConfig<T> {
    fieldType: keyof typeof fieldMap
    label?: React.ReactNode | ((formValues: Partial<T>) => React.ReactNode)
    /**
     * 表单项的label后缀
     * @description 在 require mark后面
     */
    labelSuffix?:
        | React.ReactNode
        | ((formValues: Partial<T>) => React.ReactNode)
    labelClassName?: string
    required?: boolean | ((formValues: Partial<T>) => boolean)
    requiredRule?: Partial<Omit<RuleObject, "required">>
    readOnly?: boolean
    visible?: boolean | ((formValues: Partial<T>) => boolean)
    formItemProps?: FormItemProps
    /**
     * 是否忽略默认的必填规则
     * @description 设置为 true 时，不会添加默认的必填规则
     */
    ignoreDefaultRequiredRule?: boolean
    /**
     * 表单项布局
     * @default "horizontal"
     */
    layout?: "horizontal" | "vertical"
    /**
     * 垂直布局时，是否去掉内边距
     * @default false
     */
    verticalLayoutNoPadding?: boolean
    /**
     * 表单项描述
     */
    description?:
        | React.ReactNode
        | ((formValues: Partial<T>) => React.ReactNode)
    /**
     * 是否全宽
     * @description 设置为 true 时，表单项会占满整个宽度
     */
    fullWidth?: boolean
    /**
     * 表单项的对齐方式
     * @default "center"
     * @description horizontal布局时生效
     */
    alignItems?:
        | React.CSSProperties["alignItems"]
        | ((formValues: Partial<T>) => React.CSSProperties["alignItems"])
}

export type CompProps<T extends Record<string, any>> = Omit<
    T,
    "value" | "editable" | "onChange"
> & {
    // 部分组件onChange是必填的，所以这里需要兼容成可选
    onChange?: T["onChange"]
}

export type DefaultFormItemConfig = {
    [K in keyof typeof fieldMap]: {
        fieldType: K
        compProps?: CompProps<React.ComponentProps<typeof fieldMap[K]>>
    }
}[keyof typeof fieldMap]

export type CustomFormItemConfig<C extends React.JSXElementConstructor<any>> = {
    component: C
    compProps?: CompProps<React.ComponentProps<C>>
}

export type FormItemConfig<T> = BaseFormItemConfig<T> &
    (
        | DefaultFormItemConfig
        | CustomFormItemConfig<React.JSXElementConstructor<any>>
    )

export type EditableFormConfig<T = any> = Record<string, FormItemConfig<T>>

export interface GroupMapItem {
    icon?: React.ReactNode
    className?: string
    title?: React.ReactNode
    rows: string[][]
    /**
     * 标题的id
     * @description 用于锚点
     */
    titleId?: string
    /**
     * 是否去掉内边距
     * @default false
     */
    noPadding?: boolean
}

export type GroupMap = GroupMapItem[]

export interface EditableFormProps<T = any>
    extends Omit<FormProps, "form" | "children"> {
    className?: string
    style?: React.CSSProperties
    formRef?: FormProps["form"]
    groupMap?: GroupMap
    dataConfig?: EditableFormConfig<T>
    editable?: boolean
    loading?: boolean
    /**
     * 是否不使用Form.Item组件
     * @description 设置为 true 时，不会使用Form.Item组件
     * @default false
     */
    withoutFormItem?: boolean
    /**
     * 是否隐藏表单项
     * @description 设置为 true 时，表单项会隐藏
     * @default false
     */
    hiddenItemByDisplayNone?: boolean
    /**
     * 是否忽略默认的必填规则
     * @description 设置为 true 时，不会添加默认的必填规则
     * @default false
     */
    ignoreDefaultRequiredRule?: boolean
    /**
     * 必填标记的位置
     * @description 设置为 "start" 时，必填标记在label前面
     * @description 设置为 "end" 时，必填标记在label后面
     * @default "end"
     */
    requiredMaskPosition?: "start" | "end"
    /**
     * 是否启用label省略
     * @description 设置为 true 时，label文案过长时会省略
     * @default false
     */
    labelEllipsis?: boolean
    /**
     * 表单项的对齐方式
     * @description 设置为 "start" 时，表单项在水平方向上靠左对齐
     * @description 设置为 "end" 时，表单项在水平方向上靠右对齐
     * @default "end"
     */
    formItemAlign?: "start" | "end"
    /**
     * 选择器箭头的位置
     * @description 设置为 "start" 时，选择器箭头在选择器前面
     * @description 设置为 "end" 时，选择器箭头在选择器后面
     * @default "start"
     */
    selectorArrowPosition?: "start" | "end"
    /**
     * 选择器箭头的风格
     * @description 设置为 "default" 时，选择器箭头为线性风格
     * @description 设置为 "filled" 时，选择器箭头为填充风格
     * @default "default"
     */
    selectorArrowStyle?: "default" | "filled"
    /**
     * 是否去掉最后一个组内表单项的底部内边距
     * @description 设置为 true 时，不会去掉最后一个组内表单项的底部内边距
     * @default false
     */
    lastGroupItemWithoutPaddingBottom?: boolean
    /**
     * 是否在只读模式下移除必填标记
     * @description 设置为 true 时，在只读模式下移除必填标记
     * @default false
     */
    removeRequiredIfReadOnly?: boolean
    children?: React.ReactNode
}

export type EditableFormContext = Pick<
    EditableFormProps,
    | "formRef"
    | "editable"
    | "dataConfig"
    | "withoutFormItem"
    | "hiddenItemByDisplayNone"
    | "ignoreDefaultRequiredRule"
    | "requiredMaskPosition"
    | "labelEllipsis"
    | "formItemAlign"
    | "selectorArrowPosition"
    | "selectorArrowStyle"
    | "lastGroupItemWithoutPaddingBottom"
    | "removeRequiredIfReadOnly"
>
