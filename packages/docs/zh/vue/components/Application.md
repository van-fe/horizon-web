## 局部语言配置

`Application` 会把 `locale` 提供给内部组件。示例使用独立的局部状态，因此切换语言不会影响文档页面中的其他 Demo。打开日期面板可以观察月份、星期和操作文案的变化。

:::demo vue/components/Application/i18n.vue :::

## 统一组件尺寸

通过 `size` 为嵌套组件设置统一尺寸，适合在紧凑工作台和触控友好页面之间切换。组件支持的尺寸仍以各自 API 为准。

:::demo vue/components/Application/size.vue :::

## API 摘要

- `locale`、`size`、`namespace` 与 `showTimeZone` 配置 Application 作用域内的后代组件。
- `getPopupContainer` 设置受支持浮层组件使用的全局挂载节点解析器。
- Application 只渲染默认插槽，不会增加 DOM 包装。
