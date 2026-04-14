import { EditableForm, EditableFormConfig } from "@joewrights/mobile-kit"
import React from "react"

const Basic = () => {
    const dataConfig: EditableFormConfig = {
        name: {
            label: "姓名",
            fieldType: "input",
            required: true,
        },
        age: {
            label: "年龄",
            fieldType: "input",
        },
        gender: {
            label: "性别",
            fieldType: "select",
            compProps: {
                options: [
                    { label: "男", value: "male" },
                    { label: "女", value: "female" },
                ],
            },
        },
        city: {
            label: "城市",
            fieldType: "select",
            compProps: {
                multiple: true,
                options: [
                    [
                        { label: "北京", value: "beijing" },
                        { label: "上海", value: "shanghai" },
                    ],
                    [
                        { label: "杭州", value: "hangzhou" },
                        { label: "宁波", value: "ningbo" },
                    ],
                ],
            },
        },
        birthday: {
            label: "生日",
            fieldType: "datePicker",
        },
        email: {
            label: "邮箱",
            fieldType: "textArea",
            layout: "vertical",
        },
    }

    return <EditableForm dataConfig={dataConfig} />
}

export default Basic
