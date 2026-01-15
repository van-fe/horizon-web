# Typography
样式工具类，用来设置文本与排版相关属性。

## 字号
用来快速设置元素的字体大小。

|Class|Properties|
|-|-|
|text-sm|font-size: var(--n-text-sm); /* 12px */|
|text-base|font-size: var(--n-text-base); /* 14px */|
|text-lg|font-size: var(--n-text-lg); /* 16px */|
|text-xl|font-size: var(--n-text-xl); /* 20px */|
|text-2xl|font-size: var(--n-text-2xl); /* 24px */|
|text-3xl|font-size: var(--n-text-3xl); /* 32px */|

## Demo
:::demo ./demos/fontsize.vue :::

## 字重
用来快速设置元素的字体粗细。

|Class|Properties|
|-|-|
|font-normal|font-weight: 400;|
|font-bold|font-weight: 700;|

## Demo
:::demo ./demos/fontweight.vue :::

## 排版
为了更方便使用，基于 Horizon Web UI 设计规范，我们还提供了一套排版工具类，它是字号和字重的组合。

|Class|Properties|
|-|-|
|text-headline-1|font-size: var(--n-text-3xl); /* 32px */<br>font-weight: 400;|
|text-headline-2|font-size: var(--n-text-2xl); /* 24px */<br>font-weight: 400;|
|text-subtitle-1|font-size: var(--n-text-xl); /* 20px */<br>font-weight: 700;|
|text-subtitle-2|font-size: var(--n-text-lg); /* 16px */<br>font-weight: 700;|
|text-subtitle-3|font-size: var(--n-text-base); /* 14px */<br>font-weight: 700;|
|text-body-1|font-size: var(--n-text-lg); /* 16px */<br>font-weight: 400;|
|text-body-2|font-size: var(--n-text-base); /* 14px */<br>font-weight: 400;|
|text-body-3|font-size: var(--n-text-sm); /* 12px */<br>font-weight: 400;|
|text-caption-1|font-size: var(--n-text-sm); /* 12px */<br>font-weight: 400;|
|text-caption-2|font-size: var(--n-text-sm); /* 12px */<br>font-weight: 700;|

## Demo
:::demo ./demos/fonts.vue :::

## 对齐
对齐工具类帮助你快速设置文本的对齐方式。

|Class|Properties|
|-|-|
|text-left|text-align: left;|
|text-center|text-align: center;|
|text-right|text-align: right;|
|text-justify|text-align: justify;|

## Demo
:::demo ./demos/align.vue :::

## 截取
考虑到实际需求，我们提供了单行和多行（至多 5 行）文本截取工具。

|Class|Properties|
|-|-|
|text-ellipsis|white-space: nowrap;<br>overflow: hidden;<br>text-overflow: ellipsis;|
|text-ellipsis-1|overflow: hidden;<br>text-overflow: ellipsis;<br>display: -webkit-box;<br>-webkit-line-clamp: 1;<br>-webkit-box-orient: vertical;|
|text-ellipsis-2|overflow: hidden;<br>text-overflow: ellipsis;<br>display: -webkit-box;<br>-webkit-line-clamp: 2;<br>-webkit-box-orient: vertical;|
|text-ellipsis-3|overflow: hidden;<br>text-overflow: ellipsis;<br>display: -webkit-box;<br>-webkit-line-clamp: 3;<br>-webkit-box-orient: vertical;|
|text-ellipsis-4|overflow: hidden;<br>text-overflow: ellipsis;<br>display: -webkit-box;<br>-webkit-line-clamp: 4;<br>-webkit-box-orient: vertical;|
|text-ellipsis-5|overflow: hidden;<br>text-overflow: ellipsis;<br>display: -webkit-box;<br>-webkit-line-clamp: 5;<br>-webkit-box-orient: vertical;|

## Demo
:::demo ./demos/ellipsis.vue :::
