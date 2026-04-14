# Picker 选择器

用于从屏幕边缘弹出内容区域，常用于菜单、筛选、表单和详情信息等场景。基于 `antd-mobile` 的 `Popup` 做统一样式封装。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 多列选择

通过设置 `multiple=true`，`options` 需传入二维数组，并且 `value/onChange` 会变为数组类型。

<code src="./demos/basic.tsx"></code>

## API

| 参数     | 说明                             | 类型      | 默认值 |
| -------- | -------------------------------- | --------- | ------ |
| safeArea | 底部弹层是否自动增加安全区内边距 | `boolean` | `true` |

其余属性继承 `antd-mobile` 的 `PopupProps`。
