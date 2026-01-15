## 基本用法
:::demo components/Pagination/basic.vue :::

## 配置最大页面按钮数
通过 `pager-count`，控制最大页面按钮数量
:::demo components/Pagination/max-buttons-amount.vue :::

## 是否显示范围值
设置 `show-total`，控制是否显示范围值
:::demo components/Pagination/show-range.vue :::

## 仅一页时隐藏分页
可以设置 `hide-on-single-page`，在只有一页时隐藏分页
:::demo components/Pagination/hide-on-single-page.vue :::

## 控制分页子元素
设置 `layout`，可以配置展示的元素

自 `2.0.0-beta.4` 开始，`layout` 不仅可以接收字符串数组，也可接收由逗号分割的字符串
:::demo components/Pagination/layout.vue :::

## 前后缀插槽
可以配置 `prefix` 和 `suffix` 插槽
:::demo components/Pagination/slots.vue :::

## 自定义前后翻页按钮内容
可以配置 `prev` 和 `next` 插槽，自定义前后翻页的按钮内容
:::demo components/Pagination/prev-next.vue :::

## 精简模式
配置 `type` 为 `simple` 或 `simplest`，开启精简或极简模式
:::demo components/Pagination/type.vue :::

## 禁用
设置 `disabled = true` 用来整体禁用，防止在数据请求时用户点击，造成页码抖动跳转的错误
:::demo components/Pagination/disabled.vue :::
