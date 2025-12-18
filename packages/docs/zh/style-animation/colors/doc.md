## Colors
这里提供了符合 Horizon-web 设计规范的颜色

### 全部颜色
请注意，请不要直接在项目中使用以下变量，请使用 `Tokens` 中标明的变量

此处仅是用来展示 Horizon-Web 的色盘

:::demo ./demos/index--no-code.vue :::

### CSS 工具类
上面的主题色和全部色值的名称即是一个 CSS 类，表示元素的颜色，加上 `bg-` 前缀的类名表示元素的背景颜色，例如：`error` 表示颜色为危险色，`blue-3` 表示颜色为 `#94DAFF`，`bg-brand-6` 表示背景颜色为 `#178CA6`。

### Demo
:::demo ./demos/demo1.vue :::

### JavaScript 中使用
`horizon-web` 模块导出了一个叫做 `colors` 的对象，对于上述主题色以及位于 others 中的颜色，你可以直接通过如 `colors.primary` 拿到色值；对于包含 1~10 层次的颜色如 `brand`，`colors.brand` 会返回一个数组，你可以通过 0~9 下标获取到色值。

### Demo
```js
import { colors } from '@aurora/horizon-web';
colors.gray; // ['#FFFFFF', '#F4F5F7', '#E9EAEC', '#DFE1E5', '#CED0D6', '#929398', '#6C6E73', '#54565A', '#242629', '#000000']
colors.white; // #FFFFFF
colors.red[5]; // #E83030
```

### 色彩生成工具
使用 `@aurora/colors` 提供的 `generator` 方法 可以传递一个颜色，然后生成相关色带
:::demo ./demos/generator.vue :::
