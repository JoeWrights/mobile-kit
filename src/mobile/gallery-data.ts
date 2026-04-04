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
 */
export const galleryComponents: GalleryComponentItem[] = [
    {
        key: "button",
        title: "Button 按钮",
        route: "/gallery/button",
        demos: [
            { key: "demo1", title: "Demo1", path: "/~demos/button-demo-basic" },
            {
                key: "demo2",
                title: "Demo2",
                path: "/~demos/button-demo-rounded",
            },
        ],
    },
    {
        key: "popup",
        title: "Popup 弹出层",
        route: "/gallery/popup",
        demos: [
            { key: "demo1", title: "Demo1", path: "/~demos/popup-demo-basic" },
            {
                key: "demo2",
                title: "Demo2",
                path: "/~demos/popup-demo-position",
            },
        ],
    },
]

export const getGalleryComponent = (key: string) => {
    return galleryComponents.find((item) => item.key === key)
}
