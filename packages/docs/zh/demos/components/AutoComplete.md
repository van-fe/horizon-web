## 基本用法
需要注意的是，如果希望点击后直接显示备选选项，需要在输入前给 `options` 提供数据
:::demo components/AutoComplete/basic.vue :::

## 显示备注
`options` 接受 `description` 选项
:::demo components/AutoComplete/description.vue :::

## 加载状态
可以设置 `loading` 的值，用于等待远程加载
:::demo components/AutoComplete/loading.vue :::

## 自定义插槽展示
可以使用 `default` 插槽显示自定义内容
:::demo components/AutoComplete/custom-render.vue :::

## value 优先
如果在传入的 `option` 中有 `value` 字段，则优先使用 `value` 的值
:::demo components/AutoComplete/value-label.vue :::
