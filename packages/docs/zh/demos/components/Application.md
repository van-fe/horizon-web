### i18n 配置
通过 Application 来配置多语言，让你的应用可以随时切换语言。
:::demo components/Application/i18n.vue :::

### size 配置
通过 `size` props，可以控制所有组件的大小

但部分组件不是全部都支持 `small` | `large`，使用时需要注意组件文档说明
:::demo components/Application/size.vue :::

### compatibility
因为 1.x 升级 2.x 会有一部分的破坏性变更，需要手动抹平，造成了开发成本增加，所以 `2.0.0` 增加了 `props.compatibility` 用来兼容老版本的一些破坏性变更

现在支持：
- `button.size`
- `radio.size`
- `checkbox.size`

:::demo components/Application/compatibility.vue :::
