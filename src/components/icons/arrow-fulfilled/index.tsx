import Icon, { IconComponentProps } from "@ant-design/icons/lib/components/Icon"
import React from "react"

const IconSvg = () => {
    return (
        <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
        >
            <path
                d="M275.692308 897.575385V127.606154c0-35.84 36.312615-62.424615 72.152615-41.511385 28.750769 16.817231 603.175385 355.249231 652.209231 384.196923a48.285538 48.285538 0 0 1 0 83.416616c-35.288615 21.228308-611.918769 361.432615-653.666462 385.063384C315.785846 956.140308 275.692308 936.999385 275.692308 897.575385"
                fill="currentColor"
            />
        </svg>
    )
}

const IconArrowFulfilled: React.FC<Omit<IconComponentProps, "ref">> = (
    props,
) => {
    return <Icon component={IconSvg} {...props} />
}

export default IconArrowFulfilled
