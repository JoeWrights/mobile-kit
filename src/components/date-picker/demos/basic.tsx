import { Button, DatePicker } from "@joewrights/mobile-kit"
import { PickerDate } from "antd-mobile/es/components/date-picker/util"
import React, { useState } from "react"

const defaultDate = new Date("2026-01-01T00:00:00")

const Basic = () => {
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState<PickerDate>()
    const [quickConfirmVisible, setQuickConfirmVisible] = useState(false)
    const [quickConfirmValue, setQuickConfirmValue] = useState<PickerDate>()

    return (
        <>
            <Button color="primary" onClick={() => setVisible(true)}>
                选择时间：{value?.toLocaleDateString()}
            </Button>
            <DatePicker
                visible={visible}
                value={value}
                onCancel={() => setVisible(false)}
                onChange={(value) => {
                    setValue(value)
                    setVisible(false)
                }}
            />

            <div style={{ marginTop: 12 }}>
                <Button
                    color="primary"
                    fill="outline"
                    onClick={() => setQuickConfirmVisible(true)}
                >
                    不滑动直接确定：
                    {quickConfirmValue?.toLocaleDateString() || "未选择"}
                </Button>
            </div>
            <DatePicker
                visible={quickConfirmVisible}
                value={quickConfirmValue}
                defaultValue={defaultDate}
                onCancel={() => setQuickConfirmVisible(false)}
                onChange={(value) => {
                    setQuickConfirmValue(value)
                    setQuickConfirmVisible(false)
                }}
            />
        </>
    )
}

export default Basic
