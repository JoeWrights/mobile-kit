import { DatePickerSelector } from "@joewrights/mobile-kit"
import { PickerDate } from "antd-mobile/es/components/date-picker/util"
import React, { useState } from "react"

const Basic = () => {
    const [value, setValue] = useState<PickerDate>()
    return (
        <>
            <DatePickerSelector
                title="选择时间"
                value={value}
                onChange={(value) => {
                    setValue(value)
                }}
            />
        </>
    )
}

export default Basic
