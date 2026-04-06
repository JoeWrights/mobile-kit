import { Button, Picker, PickerValueUnion } from "@joewrights/mobile-kit"
import React, { useState } from "react"

const Basic = () => {
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState<PickerValueUnion>(null)

    return (
        <>
            <Button color="primary" onClick={() => setVisible(true)}>
                选择：{value}
            </Button>
            <Picker
                visible={visible}
                value={value}
                options={[
                    { label: "Apple", value: "apple" },
                    { label: "Banana", value: "banana" },
                ]}
                onChange={(value) => {
                    setValue(value)
                    setVisible(false)
                    console.log(value)
                }}
                onCancel={() => setVisible(false)}
            />
        </>
    )
}

export default Basic
