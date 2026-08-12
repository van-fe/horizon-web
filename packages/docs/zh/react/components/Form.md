# Form 表单

Form 用于组织字段、执行异步校验，并提供校验、重置、清除错误和定位字段的命令。

## 基础用法

:::react-demo react/components/Form/basic.tsx :::

## 校验与命令

规则使用 `async-validator` 的规则结构。FormItem 内的 Input 会自动接收禁用、错误、错误描述和校验触发状态。

:::react-demo react/components/Form/validation.tsx :::

## 响应式布局

设置 `cols` 后启用响应式网格布局；FormItem 的 `span` 和 `offset` 与 Grid 使用相同的断点值。

:::react-demo react/components/Form/layout.tsx :::

## Form Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model` | `Record<string, unknown>` | `{}` | 字段路径读取的可变数据模型 |
| `rules` | `FormRules` | — | 按字段路径配置的规则 |
| `inline` | `boolean` | `false` | 未启用网格时使用行内布局 |
| `cols` / `gap` / `columnGap` / `rowGap` | `GridValue` | — | 响应式网格布局 |
| `size` | `'small' \| 'medium' \| 'large'` | Provider 尺寸 | 字段控件尺寸 |
| `labelPosition` | `'top' \| 'left'` | `'top'` | 标签位置 |
| `labelWidth` | `'auto' \| string \| number` | `'auto'` | 左侧标签宽度 |
| `showRequireMark` | `boolean` | `true` | 显示必填标记 |
| `requireMarkPosition` | `'left' \| 'right'` | `'right'` | 必填标记位置 |
| `scrollToError` | `boolean` | `false` | 滚动到首个错误字段 |
| `validateTrigger` | `'change' \| 'blur' \| Array \| false` | `'change'` | 自动校验触发时机 |
| `validateOnRuleChange` | `boolean` | `true` | 规则变化后重新校验 |
| `disabled` | `boolean` | — | 禁用兼容的字段控件 |
| `spacing` | `'default' \| 'static' \| 'compact' \| 'dynamic'` | `'default'` | 校验消息间距策略 |
| `preventSubmitDefault` | `boolean` | `true` | 阻止原生表单提交 |

## FormItem Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `field` | `string` | — | `model` 中的点号或方括号路径 |
| `label` | `ReactNode` | — | 字段标签 |
| `rules` | `FormRule \| FormRule[]` | Form 规则 | 字段级规则 |
| `required` | `boolean` | `false` | 无显式规则时添加必填规则 |
| `validateTrigger` | `FormValidateTrigger` | Form 触发值 | 覆盖字段触发时机 |
| `tip` | `ReactNode` | — | 辅助提示 |
| `helper` | `ReactNode` | — | 帮助内容 |
| `error` | `string` | `''` | 外部错误，适用于 `onlyRender` 表单 |
| `span` / `offset` | `GridValue` | `1` / `0` | 网格位置 |
| `children` | `ReactNode \| (state) => ReactNode` | — | 字段控件或状态渲染函数 |

## Callbacks 与 Ref

`onSubmit(event)` 接收原生提交事件；`onValidate(field, valid, message)` 报告每个字段的校验结果。

Form ref：`validate()`、`validateField(fields)`、`resetFields(fields?)`、`clearValidate(fields?)`、`scrollToField(field)` 和 `form`。

FormItem ref：`validate()`、`resetFields()`、`clearValidate()` 和 `element`。

每个字段都需要无障碍名称。FormItem 标签会与兼容的 Horizon 字段关联，校验错误通过 `aria-invalid`、`aria-describedby` 和 alert 区域暴露。
