import { TextArea } from "antd-mobile"

import DatePickerSelector from "../date-picker-selector/date-picker-selector"
import { Input } from "../input"
import PickerSelector from "../picker-selector/picker-selector"
import { withCompProps } from "./with-comp-props"

// 字段 => 组件映射
export const fieldMap = {
    input: Input,
    textArea: TextArea,
    select: withCompProps(PickerSelector),
    datePicker: DatePickerSelector,
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
    select: "请选择",
    datePicker: "请选择",
}
