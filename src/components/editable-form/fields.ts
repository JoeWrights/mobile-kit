import { TextArea } from "antd-mobile"

import { Input } from "../input"

// 字段 => 组件映射
export const fieldMap = {
    input: Input,
    textArea: TextArea,
}

// 字段类型
export type Field = {
    [K in keyof typeof fieldMap]: {
        fieldType: K
        compProps: React.ComponentProps<typeof fieldMap[K]>
    }
}[keyof typeof fieldMap]

// 字段必填提示
export const fieldRequiredMessage: Record<keyof typeof fieldMap, string> = {
    input: "请输入",
    textArea: "请输入",
}
