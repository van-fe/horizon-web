## Colors
Here are colors that comply with Horizon-web design specifications

## All Colors
Please note, please do not directly use the following variables in the project, please use the variables indicated in `Tokens`

This is only used to display Horizon-Web's color palette

:::demo ./demos/index--no-code.vue :::

## CSS Utility Classes
The names of the theme colors and all color values above are CSS classes, representing the color of elements. Class names with the `bg-` prefix represent the background color of elements. For example: `error` means the color is danger color, `blue-3` means the color is `#94DAFF`, `bg-brand-6` means the background color is `#178CA6`.

## Demo
:::demo ./demos/demo1.vue :::

## Use in JavaScript
The `horizon-web` module exports an object called `colors`. For the theme colors above and colors in others, you can directly get the color value through `colors.primary`; for colors containing 1~10 levels such as `brand`, `colors.brand` will return an array, and you can get the color value through 0~9 index.

## Demo
```js
import { colors } from '@aurora/horizon-web';
colors.gray; // ['#FFFFFF', '#F4F5F7', '#E9EAEC', '#DFE1E5', '#CED0D6', '#929398', '#6C6E73', '#54565A', '#242629', '#000000']
colors.white; // #FFFFFF
colors.red[5]; // #E83030
```

## Color Generation Tool
Use the `generator` method provided by `@aurora/colors` to pass a color and then generate related color bands
:::demo ./demos/generator.vue :::
