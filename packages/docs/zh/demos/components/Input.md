## 常规状态

使用 `v-model` 绑定字符串值，通过 `input-style` 在 `normal`、`emphasize` 和 `no-border` 外观间切换。禁用状态应同时说明字段为何不可编辑。

:::demo components/Input/demo1.vue :::

## 密码输入框

设置 `type="password"` 后内容会被隐藏；启用 `show-password` 可使用内置按钮切换可见性。密码字段应设置合适的 `autocomplete`，并以可见规则反馈当前强度。启用 `show-password` 时，`suffix-icon` 不生效。

:::demo components/Input/password.vue :::

## 禁用状态

`disabled` 会阻止输入与焦点交互，适合展示由外部系统托管且当前不可修改的值。请在字段附近说明锁定来源以及可用的后续操作。

:::demo components/Input/disabled.vue :::

## 可清空

设置 `clearable` 后，有值时会出现清空按钮，并在清空时触发 `clear` 事件。清空属于一次明确操作，建议同步更新预览、校验和状态反馈。

:::demo components/Input/clearable.vue :::

## 输入状态

传入 `status="error"` 可标记无效输入。错误状态需要搭配具体提示，并通过 `aria-describedby` 或邻近文本让辅助技术理解修正方式。

:::demo components/Input/status.vue :::

## 尺寸

组件提供 `small`、`medium`、`large` 三种尺寸，默认使用 `medium`。尺寸应根据界面密度和操作重要性选择，而不是在同一表单中随意混用。

:::demo components/Input/size.vue :::

## 图标和前后缀

通过 `prefix-icon`、`suffix-icon` 或 `prefix`、`suffix` 插槽补充货币、单位、状态和帮助入口。可操作图标需要清晰的无障碍名称和键盘焦点。

:::demo components/Input/icon.vue :::

## 组合式输入框

`prepend` 和 `append` 插槽可将协议、域名后缀、单位或其他控件附着在输入框两端。组合控件在窄屏仍应保留足够的主输入区域，且每个子控件都要有名称。

:::demo components/Input/mixed.vue :::

## 嵌入复合组件

`embedded` 复用 Input 的值、焦点、禁用和输入法行为，但不渲染默认外观；配合 `fit-content` 可让字段随内容变化。适合收件人、标签和 Picker 等复合表单组件。

:::demo components/Input/embedded.vue :::

## 多行输入框

将 `type` 设置为 `textarea` 后，可以通过 `rows` 和 `resize` 控制初始尺寸及用户调整方式。`auto-size` 支持自动高度，也可用 `{ minRows, maxRows }` 限制增长范围。

:::demo components/Input/textarea.vue :::

## 字数限制

`maxlength` 与 `show-limit` 会展示当前字数。启用 `enable-out-of-exceeded` 后仍可继续输入，因此应结合 `status` 或表单规则明确标记超限状态。

:::demo components/Input/limit.vue :::

## 搜索输入框

搜索场景可组合前缀图标、`clearable` 与 Enter 键事件。结果数量、空状态和最近提交内容都应直接显示，避免仅在控制台中处理搜索。

:::demo components/Input/search.vue :::

## 输入事件

组件提供 `input`、`change`、`clear`、焦点和键盘等事件。`input` 在编辑期间持续触发，`change` 在失焦且值发生变化后触发；可视化事件计数有助于理解二者时序。

:::demo components/Input/event.vue :::
