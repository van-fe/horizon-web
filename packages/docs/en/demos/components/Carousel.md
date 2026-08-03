Carousel rotates peer content in limited space. Give every item a concise `label` and the carousel a purpose-specific `aria-label`.

## Basic Usage

Place multiple `h-carousel-item` components inside `h-carousel`. Users can navigate with arrows, indicators, touch, or the keyboard.

:::demo components/Carousel/basic.vue :::

## Autoplay

`interval` controls rotation timing. Autoplay pauses on hover, hidden pages, or focus entry, and the demo also provides an explicit pause and resume action.

:::demo components/Carousel/autoplay.vue :::

## Fade, Controlled Index, and Methods

Use `v-model` for the active index and `effect="fade"` for cross-fade. The instance exposes `prev`, `next`, `setActiveItem`, `pause`, and `play`.

:::demo components/Carousel/effect.vue :::

## Vertical Direction

Set `direction="vertical"` for vertical movement. After focusing the carousel, use the arrow, Home, and End keys.

:::demo components/Carousel/vertical.vue :::

## Accessibility

Inactive slides are removed from assistive technology and keyboard navigation. Autoplay should expose a discoverable pause mechanism and remain paused after an explicit user choice.
