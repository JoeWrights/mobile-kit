export interface GalleryDemoItem {
    key: string
    title: string
    path: string
}

export interface GalleryComponentItem {
    key: string
    title: string
    route: string
    demos: GalleryDemoItem[]
}

/**
 * 按 PC 端组件菜单顺序维护移动端组件列表
 * 由 scripts/sync-gallery-demos.cjs 自动生成
 */
export const galleryComponents: GalleryComponentItem[] = [
    {
        key: "button",
        title: "Button 按钮",
        route: "/gallery/button",
        demos: [
            {
                key: "demo1",
                title: "基础用法",
                path: "/~demos/src-components-button-demo-basic",
            },
            {
                key: "demo2",
                title: "圆角开关",
                path: "/~demos/src-components-button-demo-rounded",
            },
        ],
    },
    {
        key: "popup",
        title: "Popup 弹出层",
        route: "/gallery/popup",
        demos: [
            {
                key: "demo1",
                title: "基础用法",
                path: "/~demos/popup-demo-basic",
            },
            {
                key: "demo2",
                title: "弹出方向",
                path: "/~demos/popup-demo-position",
            },
        ],
    },
    {
        key: "popup-container",
        title: "PopupContainer 弹出容器",
        route: "/gallery/popup-container",
        demos: [
            {
                key: "demo1",
                title: "基础用法",
                path: "/~demos/src-components-popup-container-demo-basic",
            },
            {
                key: "demo2",
                title: "底部按钮",
                path: "/~demos/src-components-popup-container-demo-show-footer",
            },
        ],
    },
]

export const getGalleryComponent = (key: string) => {
    return galleryComponents.find((item) => item.key === key)
}
