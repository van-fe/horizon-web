# Select 选择器

Select 用于从一组选项中选择一个值，支持数据选项、声明式选项、受控状态、输入筛选、键盘操作和 Portal 面板。

## 基础用法

```tsx
import { Select } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Select/basic.tsx :::

## 声明式选项

```tsx
import { Option, OptionGroup, Select } from '@aurora/horizon-web-react';

<Select placeholder="请选择">
  <OptionGroup label="常用城市">
    <Option value="shanghai">上海</Option>
    <Option value="tokyo">东京</Option>
  </OptionGroup>
</Select>;
```

## 键盘与无障碍

触发元素使用 `role="combobox"` 并关联 `role="listbox"` 面板。使用方向键移动高亮项，`Enter` 选择，`Home`、`End` 跳到边界，`Escape` 关闭面板。禁用项会从键盘导航中跳过。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `SelectValue` | — | 受控选中值 |
| `defaultValue` | `SelectValue` | — | 非受控初始值 |
| `open` | `boolean` | — | 受控面板状态 |
| `defaultOpen` | `boolean` | `false` | 非受控初始面板状态 |
| `options` | `SelectOptionData[]` | — | 数据选项 |
| `children` | `Option \| OptionGroup` | — | 声明式选项 |
| `filterable` | `boolean` | `false` | 启用输入筛选 |
| `filter` | `(input, option) => boolean` | 内置文本筛选 | 自定义筛选函数 |
| `placeholder` | `string` | Provider 字典 | 占位文字 |
| `emptyContent` | `ReactNode` | Provider 字典 | 空状态内容 |
| `disabled` | `boolean` | `false` | 禁止交互 |
| `clearable` | `boolean` | `false` | 显示清空按钮 |
| `required` | `boolean` | `false` | 设置必填语义 |
| `invalid` | `boolean` | `false` | 设置错误语义和样式 |
| `name` | `string` | — | 原生表单字段名 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| `placement` | `WebPlacement` | `'bottom-start'` | 面板位置 |
| `portal` | `boolean` | `true` | 是否使用 Portal |
| `portalContainer` | `PortalTarget` | `'body'` | Portal 容器 |
| `panelHeader` | `ReactNode` | — | 面板头部 |
| `panelFooter` | `ReactNode` | — | 面板底部 |
| `renderOption` | `(option, state) => ReactNode` | — | 自定义选项内容 |

## Callbacks

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onChange` | `(value, details) => void` | 选中值变化时调用，`details.reason` 标识来源 |
| `onOpenChange` | `(open, details) => void` | 面板状态变化时调用 |
| `onBlur` | `FocusEventHandler` | 触发元素失焦时调用 |

## Ref

`ref` 暴露 `focus()`、`open()`、`close()`、`clear()` 和 `updatePosition()`。
