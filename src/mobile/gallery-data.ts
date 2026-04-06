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
        route: "/gallery/component.html?component=button",
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
        key: "editable-form",
        title: "EditableForm 可编辑表单",
        route: "/gallery/component.html?component=editable-form",
        demos: [
            {
                key: "demo1",
                title: "基础用法",
                path: "/~demos/src-components-editable-form-demo-basic",
            },
        ],
    },
    {
        key: "picker",
        title: "Picker 选择器",
        route: "/gallery/component.html?component=picker",
        demos: [
            {
                key: "demo1",
                title: "基础用法",
                path: "/~demos/src-components-picker-demo-basic",
            },
        ],
    },
    {
        key: "picker-selector",
        title: "PickerSelector 选择器",
        route: "/gallery/component.html?component=picker-selector",
        demos: [
            {
                key: "demo1",
                title: "基础用法",
                path: "/~demos/src-components-picker-selector-demo-basic",
            },
        ],
    },
    {
        key: "popup-container",
        title: "PopupContainer 弹出容器",
        route: "/gallery/component.html?component=popup-container",
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
