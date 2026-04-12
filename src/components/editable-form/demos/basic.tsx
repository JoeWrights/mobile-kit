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
        email: {
            label: "邮箱",
            fieldType: "textArea",
            layout: "vertical",
        },
    }

    return <EditableForm dataConfig={dataConfig} />
}

export default Basic
