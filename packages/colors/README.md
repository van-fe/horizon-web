<h1 align="center">@nio-fe/colors</h1>

<h4 align="center">Color palettes calculator of @nio-fe/lego</h2>

## Install
```shell
pnpm i @nio-fe/color
# or
yarn add @nio-fe/color
```

## Usage
### use color
```ts
import {
  gray,
  brand,
} from '@nio-fe/color';

console.log(gray); // ['#FFFFFF', '#F4F5F7', '#E9EAEC', '#DFE1E5', '#CED0D6', '#929398', '#6C6E73', '#54565A', '#242629', '#000000']
console.log(gray.primary); // '#242629'
```

### use generator to create colors
```ts
import { generator, setColor, red } from '@nio-fe/color';

console.log(generator('#242629')); // ['#FFFFFF', '#F4F5F7', '#E9EAEC', '#DFE1E5', '#CED0D6', '#929398', '#6C6E73', '#54565A', '#242629', '#000000']
console.log(setColor('red', '#FF0000'));
console.log(red);
```

## Reference
[ant-design-colors](https://github.com/ant-design/ant-design-colors)
