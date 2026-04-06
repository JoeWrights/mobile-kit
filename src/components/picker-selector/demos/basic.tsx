import { PickerSelector, PickerValueUnion } from "@joewrights/mobile-kit"
import React, { useState } from "react"

const Basic = () => {
    const [value, setValue] = useState<PickerValueUnion>(null)
    const [visible, setVisible] = useState(false)
    return (
        <>
            <PickerSelector
                title="选择器"
                visible={visible}
                value={value}
                options={[
                    { label: "选项1", value: "1" },
                    { label: "选项2", value: "2" },
                ]}
                onChange={(value) => {
                    console.log(value)
                    setValue(value)
                    setVisible(false)
                }}
            />
        </>
    )
}

export default Basic
