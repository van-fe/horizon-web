# Spacing
Style utility classes for setting element margins and padding.

class rule: `{type}{direction}-{size}`.

**type** is the type of spacing:
* `m` - represents `margin`
* `p` - represents `padding`

**direction** is the direction of spacing:
* `t` - represents `top`
* `r` - represents `right`
* `b` - represents `bottom`
* `l` - represents `left`
* `x` - represents `left` and `right`
* `y` - represents `top` and `bottom`
* `empty` - represents spacing for 4 sides

**size** is the size of spacing:
* `0` - represents `0`
* `1` - represents `4px`
* `2` - represents `8px`
* `3` - represents `12px`
* `4` - represents `16px`
* `5` - represents `20px`
* `6` - represents `24px`
* `7` - represents `28px`
* `8` - represents `32px`
* `9` - represents `36px`
* `10` - represents `40px`
* `11` - represents `44px`
* `12` - represents `48px`
* `13` - represents `52px`
* `14` - represents `56px`
* `15` - represents `60px`
* `16` - represents `64px`
* `auto` - represents `auto`

Examples:
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

## Demo
:::demo ./demos/demo1.vue :::
