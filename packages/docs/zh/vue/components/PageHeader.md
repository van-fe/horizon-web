## 基本用法
:::demo vue/components/PageHeader/basic.vue :::

## 搭配面包屑使用
使用 `breadcrumb` 插槽，放置面包屑
:::demo vue/components/PageHeader/breadcrumb.vue :::

## 可交互内容
:::demo vue/components/PageHeader/interactive.vue :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `icon` | `Icon \| string \| null` | 返回图标 | 返回图标；设置为 `null` 时隐藏返回操作 |
| `title` / `content` | `string` | — | 默认标题和说明文字 |
| `useDivider` | `boolean` | `true` | 显示主区域底部分割线 |
| `disabledHeaderTooltip` | `boolean` | `false` | 禁用标题溢出提示 |
| `backAriaLabel` | `string` | 本地化文案 | 返回操作的可访问名称 |

## Events

| 事件 | 说明 |
| --- | --- |
| `back` | 返回操作被激活时触发 |

## Slots

| 插槽 | 说明 |
| --- | --- |
| `default` | 标题区下方的扩展内容 |
| `icon` | 返回图标 |
| `header` | 完整标题区 |
| `title` / `titleOuter` | 标题内容或完整标题容器 |
| `tags` | 标题旁标签 |
| `content` | 说明内容 |
| `extra` | 页面级操作 |
| `breadcrumb` | 面包屑内容 |
