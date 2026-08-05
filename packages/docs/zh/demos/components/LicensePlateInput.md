## 基础用法

:::demo components/LicensePlateInput/basic.vue :::

## 内联键盘面板

设置 `inline-panel` 后，键盘面板会直接参与页面布局并持续显示在输入框下方，不创建 Popover。此模式适合移动端表单、停车场终端等需要固定操作区的场景。

:::demo components/LicensePlateInput/inline-panel.vue :::

## 新能源、校验与不可编辑状态

组件支持普通 7 位车牌和新能源 8 位车牌。`new-energy` 可固定启用第八位；未开启时，点击虚线“新能源”格也可临时扩展。面板支持退格、清空和完成操作，实体键盘可使用字母、数字、方向键、Backspace、Delete、Escape，也支持粘贴完整车牌号。开启 `validate-on-blur` 时（默认开启），非空的不完整或无效号码会在面板关闭或失焦后显示错误状态。

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
| new-energy | 固定启用新能源第八位 | `boolean` | `false` |
| clearable | 允许清空 | `boolean` | `true` |
| inline-panel | 在输入框下方持续展示内联键盘面板 | `boolean` | `false` |
| placeholder | 号码占位文本 | `string` | 国际化文案 |
| default-province | 空值时默认省份简称 | `string` | `'京'` |
| provinces | 可选省份简称 | `string[]` | 31 个大陆省级行政区简称 |
| validate-on-blur | 失焦后显示格式错误 | `boolean` | `true` |
| status | 手动错误状态 | `'error'` | — |
| aria-label | 组件无障碍名称 | `string` | 国际化文案 |
| province-aria-label | 省份键盘无障碍名称 | `string` | 国际化文案 |
| keyboard-aria-label | 车牌键盘面板无障碍名称 | `string` | 国际化文案 |
| placement | 键盘面板位置 | `'top-start' \| 'top' \| 'top-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end'` | `'bottom-start'` |
| flip | 底部空间不足时是否允许面板翻转到顶部 | `boolean` | `false` |
| to-body | 将键盘面板传送至 body | `boolean` | `true` |

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
| input | `HTMLInputElement` | 用于键盘与辅助技术的原生隐藏输入元素 |
| focus / blur / select | `() => void` | 控制号码输入框 |
| open / close | `() => void` | 打开或关闭车牌键盘面板 |
| validate | `() => { valid, type, value }` | 立即校验并返回结果 |
