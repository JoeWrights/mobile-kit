import { Button } from "@joewrights/mobile-kit"
import { Space } from "antd-mobile"
import React from "react"

const Rounded = () => {
    return (
        <Space direction="vertical" block>
            <Button color="primary" shape="rounded">
                默认圆角
            </Button>
            <Button color="primary">关闭圆角</Button>
        </Space>
    )
}

export default Rounded
