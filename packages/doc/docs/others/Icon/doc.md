### 使用方式

**安装**

```bash
npm i @aurora/icon
```

**引入样式文件**

```javascript
import '@aurora/icon/dist/style.css';
```

**使用默认的 icon 图标**

> // iconfont

```javascript
import { NIcon } from '@aurora/icon';
createAPP(APP).component('NIcon', NIcon);
```

// svg-sprite

```javascript
import { NIconSVG } from '@aurora/icon';
createAPP(APP).component('NIconSVG', NIconSVG);
```

// 按需引入

```javascript
import { IconSuccessFilledLight } from '@aurora/icon';
```

**使用自定义的 iconfont/svg-sprite 图标**

> // useReplaceSource 方法会根据后缀名匹配来进行 css/js 的引入替换

```javascript
import { useReplaceSource } from '@aurora/icon';
useReplaceSource('//at.alicdn.com/t/font_2962239_5iytu1pvi1u.css');
```

**追加 iconfont/svg-sprite 图标**

> // useLinkLoad, useScriptLoad 均接收两个参数，第一个参数是引入的 url，第二个参数是 link/script 的 className

```javascript
import { useLinkLoad, useScriptLoad } from '@aurora/icon';
useLinkLoad('url://example.css', 'className');
useScriptLoad('url://example.js', 'className');
```

## 图标

请访问 [AuroraResource](https://aurora-resource.nioint.com/project/detail/1)

## Demos

### 使用 Font Class 图标

:::demo ./demos/font-class.vue :::

### 使用 SVG Symbol 图标

:::demo ./demos/svg-sprite.vue :::

### 按需引入图标

:::demo ./demos/need-svg.vue :::

## Api

**适用于全引入的 Font Class 和 SVG Symbol 图标**

| 属性       | 说明                          | 类型               | 是否必填      | 默认值    |
|----------|-----------------------------|------------------|-----------|--------|
| name     | 图标 name                     | string           | true      | \-     |
| color    | 图标颜色                        | string           | false     | ''     |
| spin     | 开启旋转,默认顺时针方向<br/>可选值：cw/ccw | string           | false     | ''     |
| size     | 图标大小                        | string        \| number    | false  | -      |
| rotate   | 图标转动角度值                     | number           | false     | \-     |

**适用于按需引入和单个引入的 SVG 图标**

| 属性       | 说明                          | 类型       | 是否必填    | 默认值   |
|----------|-----------------------------|----------|---------|-------|
| color    | 图标颜色                        | string[] \| string | false   | \-    |
| spin     | 开启旋转,默认顺时针方向<br/>可选值：cw/ccw | string   | false   | ''    |
| size     | 图标大小                        | string \| number  | false | -   |
| rotate   | 图标转动角度值                     | number   | false   | \-    |
