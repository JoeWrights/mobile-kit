import { PickerSelector, PickerValue } from "@joewrights/mobile-kit"
import React, { useState } from "react"

const Basic = () => {
    const [singleValue, setSingleValue] = useState<PickerValue>(null)
    const [multipleValue, setMultipleValue] = useState<PickerValue[]>([
        "zj",
        "hz",
    ])

    return (
        <>
            <PickerSelector
                title="单列选择器"
                value={singleValue}
                options={[
                    { label: "选项1", value: "1" },
                    { label: "选项2", value: "2" },
                ]}
                arrowStyle="default"
                onChange={(value) => {
                    console.log(value)
                    setSingleValue(value)
                }}
            />

            <div style={{ height: 12 }} />

            <PickerSelector
                title="多列选择器"
                multiple
                value={multipleValue}
                options={[
                    [
                        { label: "浙江", value: "zj" },
                        { label: "江苏", value: "js" },
                    ],
                    [
                        { label: "杭州", value: "hz" },
                        { label: "宁波", value: "nb" },
                        { label: "南京", value: "nj" },
                        { label: "苏州", value: "sz" },
                    ],
                ]}
                onChange={(value) => {
                    console.log(value)
                    setMultipleValue(value)
                }}
            />
        </>
    )
}

export default Basic
