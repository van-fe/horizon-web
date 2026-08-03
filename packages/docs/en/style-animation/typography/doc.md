# Typography
Style utility classes for setting text and typography related properties.

## Font Size
Used to quickly set the font size of elements.

|Class|Properties|
|-|-|
|text-sm|font-size: var(--h-text-sm); /* 12px */|
|text-base|font-size: var(--h-text-base); /* 14px */|
|text-lg|font-size: var(--h-text-lg); /* 16px */|
|text-xl|font-size: var(--h-text-xl); /* 20px */|
|text-2xl|font-size: var(--h-text-2xl); /* 24px */|
|text-3xl|font-size: var(--h-text-3xl); /* 32px */|

## Demo
:::demo ./demos/fontsize.vue :::

## Font Weight
Used to quickly set the font weight of elements.

|Class|Properties|
|-|-|
|font-normal|font-weight: 400;|
|font-bold|font-weight: 700;|

## Demo
:::demo ./demos/fontweight.vue :::

## Typography
For easier use, based on Horizon Web UI design specifications, we also provide a set of typography utility classes, which are combinations of font size and font weight.

|Class|Properties|
|-|-|
|text-headline-1|font-size: var(--h-text-3xl); /* 32px */<br>font-weight: 400;|
|text-headline-2|font-size: var(--h-text-2xl); /* 24px */<br>font-weight: 400;|
|text-subtitle-1|font-size: var(--h-text-xl); /* 20px */<br>font-weight: 700;|
|text-subtitle-2|font-size: var(--h-text-lg); /* 16px */<br>font-weight: 700;|
|text-subtitle-3|font-size: var(--h-text-base); /* 14px */<br>font-weight: 700;|
|text-body-1|font-size: var(--h-text-lg); /* 16px */<br>font-weight: 400;|
|text-body-2|font-size: var(--h-text-base); /* 14px */<br>font-weight: 400;|
|text-body-3|font-size: var(--h-text-sm); /* 12px */<br>font-weight: 400;|
|text-caption-1|font-size: var(--h-text-sm); /* 12px */<br>font-weight: 400;|
|text-caption-2|font-size: var(--h-text-sm); /* 12px */<br>font-weight: 700;|

## Demo
:::demo ./demos/fonts.vue :::

## Alignment
Alignment utility classes help you quickly set text alignment.

|Class|Properties|
|-|-|
|text-left|text-align: left;|
|text-center|text-align: center;|
|text-right|text-align: right;|
|text-justify|text-align: justify;|

## Demo
:::demo ./demos/align.vue :::

## Truncation
Considering actual needs, we provide single-line and multi-line (up to 5 lines) text truncation utilities.

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
