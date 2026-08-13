# CommandPalette 命令面板

CommandPalette 提供键盘优先的全局操作入口。用户可以点击触发器，或按 Command/Ctrl + K 打开面板；输入关键词后使用方向键在可用命令间移动，按 Enter 执行。

:::demo vue/components/CommandPalette/basic.vue :::

异步 `perform` 执行期间会自动去重；执行失败时组件触发 `error` 并保持打开，便于用户重试。搜索输入框通过 `aria-controls` 与 `aria-activedescendant` 描述当前列表和活动命令。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | 通过 `v-model:visible` 使用的显示状态。 |
| `commands` | `CommandPaletteItem[]` | `[]` | 命令列表，包含 `id`、`label`，以及可选的说明、关键词、快捷键、禁用状态和 `perform`。 |
| `placeholder` | `string` | 本地化文本 | 搜索占位文字。 |
| `emptyText` | `string` | 本地化文本 | 无结果文字。 |
| `hotkey` | `boolean` | `true` | 是否启用 Command/Ctrl + K。 |
| `closeOnSelect` | `boolean` | `true` | 执行成功后是否请求关闭。 |
| `filter` | `(query, command) => boolean` | 标签/关键词匹配 | 自定义命令过滤函数。 |

## Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:visible` | `boolean` | 请求更新显示状态。 |
| `select` | `CommandPaletteItem` | 命令执行成功后触发。 |
| `search` | `string` | 查询内容变化时触发。 |
| `error` | `error, command` | 命令执行失败时触发。 |

## Slots

| 插槽 | 作用域 | 说明 |
| --- | --- | --- |
| `command` | `{ command, active, pending }` | 自定义命令项。 |
| `empty` | — | 自定义空状态。 |

## Exposes

| 方法 | 说明 |
| --- | --- |
| `open()` | 请求打开面板。 |
| `close()` | 请求关闭面板。 |
| `focus()` | 聚焦搜索输入框。 |
