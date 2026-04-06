import { TextArea } from "antd-mobile"

// 字段 => 组件映射
export const fieldMap = {
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
    textArea: "请输入",
}
