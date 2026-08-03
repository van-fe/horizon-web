<h1 align="center">@aurora/colors</h1>

<h4 align="center">Color palettes calculator of @aurora/horizon-web</h2>

## Install
```shell
bun add @aurora/color
# or
yarn add @aurora/color
```

## Usage
### use color
```ts
import {
  gray,
  brand,
} from '@aurora/color';

console.info(gray); // ['#FFFFFF', '#F4F5F7', '#E9EAEC', '#DFE1E5', '#CED0D6', '#929398', '#6C6E73', '#54565A', '#242629', '#000000']
console.info(gray.primary); // '#242629'
```

### use generator to create colors
```ts
import { generator, setColor, red } from '@aurora/color';

console.info(generator('#242629')); // ['#FFFFFF', '#F4F5F7', '#E9EAEC', '#DFE1E5', '#CED0D6', '#929398', '#6C6E73', '#54565A', '#242629', '#000000']
console.info(setColor('red', '#FF0000'));
console.info(red);
```

## Reference
[ant-design-colors](https://github.com/ant-design/ant-design-colors)
