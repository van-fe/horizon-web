## 与 radio 结合使用
:::demo vue/components/Panels/basic.vue :::

## 与 tabs 结合使用
:::demo vue/components/Panels/tab.vue :::

## 垂直方向
默认情况下，面板具有水平的动画效果，且会自动监听切换方向是从左到右，还是从右到左，显示最恰当的动画。你也可以通过设置 `vertical` 启用垂直方向的动画。
:::demo vue/components/Panels/vertical.vue :::

## 附加样式
为提高灵活度，面板尽可能不自带无关样式，你可以通过 [Styles & Animation](../../style-animation/center/doc) 中的工具类或 `style` 来附加想要的样式。
:::demo vue/components/Panels/style.vue :::

## Panels 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string \| number` | — | 必填，当前面板标识 |
| `animated` | `boolean` | `false` | 切换面板时播放动画 |
| `vertical` | `boolean` | `false` | 使用垂直动画而非水平动画 |

## Panels 插槽

| 插槽 | 说明 |
| --- | --- |
| `default` | 组合的 `HPanel` 子项 |

## Panel 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `name` | `string \| number` | — | 必填，唯一面板标识 |
| `disabled` | `boolean` | `false` | 禁用并排除该面板 |

## Panel 插槽

| 插槽 | 说明 |
| --- | --- |
| `default` | 面板内容 |
