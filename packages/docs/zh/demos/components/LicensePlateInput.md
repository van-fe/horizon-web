# LicensePlateInput 车牌号输入

用于输入中国大陆车牌号。组件将省份简称与后续号码分开输入，并通过 `v-model` 返回完整车牌号。输入中的英文字母会自动转为大写，空格、中点和连字符会自动移除。

## 基础用法

:::demo components/LicensePlateInput/basic.vue :::

## 新能源、校验与不可编辑状态

组件支持普通 7 位车牌和新能源 8 位车牌。开启 `validate-on-blur` 时（默认开启），非空的不完整或无效号码会在失焦后显示错误状态。

:::demo components/LicensePlateInput/states.vue :::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 完整车牌号 | `string` | `''` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | 全局尺寸 |
| input-style | 输入控件样式 | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` |
| disabled | 禁用 | `boolean` | `false` |
| readonly | 只读 | `boolean` | `false` |
| clearable | 允许清空 | `boolean` | `true` |
| placeholder | 号码占位文本 | `string` | 国际化文案 |
| default-province | 空值时默认省份简称 | `string` | `'京'` |
| provinces | 可选省份简称 | `string[]` | 31 个大陆省级行政区简称 |
| validate-on-blur | 失焦后显示格式错误 | `boolean` | `true` |
| status | 手动错误状态 | `'error'` | — |
| aria-label | 组件无障碍名称 | `string` | 国际化文案 |
| province-aria-label | 省份选择器无障碍名称 | `string` | 国际化文案 |

### Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:model-value | `(value)` | 更新完整车牌号 |
| input / change | `(value, type)` | 输入或提交变更；`type` 为 `empty`、`incomplete`、`standard`、`new-energy` 或 `invalid` |
| province-change | `(province)` | 省份简称变化 |
| validity-change | `(valid, type)` | 有效性变化 |
| focus / blur | `(event)` | 号码输入框聚焦状态变化 |
| clear | — | 点击清空按钮 |

### Slots

| 名称 | 说明 |
| --- | --- |
| suffix | 号码输入框尾部内容 |

### Exposes

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| input | `HTMLInputElement` | 原生号码输入元素 |
| focus / blur / select | `() => void` | 控制号码输入框 |
| validate | `() => { valid, type, value }` | 立即校验并返回结果 |
