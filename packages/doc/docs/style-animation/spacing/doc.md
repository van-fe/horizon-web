# Spacing
样式工具类，用来设置元素的内外边距。

class 规则：`{type}{direction}-{size}`。

**type** 是边距的类型：
* `m` - 表示 `margin`
* `p` - 表示 `padding`

**direction** 是边距的方向：
* `t` - 表示 `top`
* `r` - 表示 `right`
* `b` - 表示 `bottom`
* `l` - 表示 `left`
* `x` - 表示 `left` 和 `right`
* `y` - 表示 `top` 和 `bottom`
* `空` - 表示 4 个边的边距

**size** 是边距的大小：
* `0` - 表示 `0`
* `1` - 表示 `4px`
* `2` - 表示 `8px`
* `3` - 表示 `12px`
* `4` - 表示 `16px`
* `5` - 表示 `20px`
* `6` - 表示 `24px`
* `7` - 表示 `28px`
* `8` - 表示 `32px`
* `9` - 表示 `36px`
* `10` - 表示 `40px`
* `11` - 表示 `44px`
* `12` - 表示 `48px`
* `13` - 表示 `52px`
* `14` - 表示 `56px`
* `15` - 表示 `60px`
* `16` - 表示 `64px`
* `auto` - 表示 `auto`

示例：
|Class|Properties|
|-|-|
|m-1|margin: 4px;|
|mt-3|margin-top: 12px;|
|mr-5|margin-right: 20px;|
|p-2|padding: 8px;|
|pb-3|padding-bottom: 12px;|
|pl-5|padding-left: 20px;|
|mx-auto|margin-left: auto;<br>margin-right: auto;|
|py-10|padding-top: 40px;<br>padding-bottom: 40px;|

### Demo
:::demo ./demos/demo1.vue :::
