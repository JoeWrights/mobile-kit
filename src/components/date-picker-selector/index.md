# DatePickerSelector 时间选择器

日期选择触发器组件，点击后弹出时间选择面板。适用于表单场景，支持受控与非受控两种用法。

## 基础用法

<code src="./demos/basic.tsx"></code>

## API

| 参数                  | 说明                           | 类型                                                                  | 默认值 |
| --------------------- | ------------------------------ | --------------------------------------------------------------------- | ------ |
| value                 | 当前选中日期（受控）           | `PickerDate`                                                          | -      |
| defaultValue          | 默认选中日期（非受控）         | `PickerDate`                                                          | -      |
| onChange              | 确认后的回调                   | `(value?: PickerDate, extendedValue?: Record<string, unknown>) => void` | -      |
| placeholder           | 未选择时的占位文案             | `string`                                                              | `请选择` |
| editable              | 是否可编辑                     | `boolean`                                                             | `true` |
| arrowStyle            | 箭头样式                       | `"default" \| "filled"`                                               | `default` |
| arrowPosition         | 箭头位置                       | `"start" \| "end"`                                                    | `start` |
| popupProps            | 弹层属性（不含 title/visible） | `PopupContainerProps`                                                 | -      |
| datePickerViewProps   | 日期面板属性                   | `DatePickerViewProps`                                                 | -      |

其余属性继承 `DatePicker` 的能力（例如 `min`、`max`、`precision`、`safeArea` 等）。
