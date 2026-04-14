import { Button, Picker, PickerValue } from "@joewrights/mobile-kit"
import React, { useState } from "react"

const Basic = () => {
    const [singleVisible, setSingleVisible] = useState(false)
    const [singleValue, setSingleValue] = useState<PickerValue>(null)
    const [multipleVisible, setMultipleVisible] = useState(false)
    const [multipleValue, setMultipleValue] = useState<PickerValue[]>([])

    return (
        <>
            <Button color="primary" onClick={() => setSingleVisible(true)}>
                单列选择：{singleValue ?? "未选择"}
            </Button>
            <Picker
                visible={singleVisible}
                value={singleValue}
                options={[
                    { label: "Apple", value: "apple" },
                    { label: "Banana", value: "banana" },
                ]}
                onChange={(value) => {
                    setSingleValue(value)
                    setSingleVisible(false)
                    console.log(value)
                }}
                onCancel={() => setSingleVisible(false)}
            />

            <div style={{ marginTop: 12 }}>
                <Button
                    color="primary"
                    fill="outline"
                    onClick={() => setMultipleVisible(true)}
                >
                    多列选择：
                    {multipleValue.length > 0
                        ? multipleValue.join(" / ")
                        : "未选择"}
                </Button>
            </div>
            <Picker
                visible={multipleVisible}
                multiple
                value={multipleValue}
                options={[
                    [
                        { label: "浙江", value: "zhejiang" },
                        { label: "江苏", value: "jiangsu" },
                    ],
                    [
                        { label: "杭州", value: "hangzhou" },
                        { label: "南京", value: "nanjing" },
                    ],
                ]}
                onChange={(value) => {
                    setMultipleValue(value)
                    setMultipleVisible(false)
                    console.log(value)
                }}
                onCancel={() => setMultipleVisible(false)}
            />
        </>
    )
}

export default Basic
