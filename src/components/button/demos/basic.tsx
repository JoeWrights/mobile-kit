import { Button } from "@joewrights/mobile-kit"
import { Space } from "antd-mobile"
import React from "react"

const Basic = () => {
    return (
        <Space direction="vertical" block>
            <Button color="primary">主要按钮</Button>
            <Button color="secondary">次要按钮</Button>
            <Button color="third">第三按钮</Button>
            <Button color="success">成功按钮</Button>
            <Button color="warning">警告按钮</Button>
            <Button color="danger">危险按钮</Button>
            <Button color="primary" disabled>
                禁用按钮
            </Button>
            <Button color="primary" loading>
                加载中按钮
            </Button>
        </Space>
    )
}

export default Basic
