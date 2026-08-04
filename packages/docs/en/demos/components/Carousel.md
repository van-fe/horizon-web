Carousel rotates peer content in limited space. The image treatment uses full-bleed images, circular arrows, and dot indicators. Give every item a concise `label` and the carousel a purpose-specific `aria-label`.

## Basic Usage

Place multiple `h-carousel-item` components inside `h-carousel`. The basic image carousel shows direction arrows and bottom dots, and also supports touch and keyboard navigation.

:::demo components/Carousel/basic.vue :::

## Autoplay

`interval` controls rotation timing. Autoplay pauses temporarily on hover, hidden pages, or while focus is inside. An explicit user pause remains in effect.

:::demo components/Carousel/autoplay.vue :::

## Fade

Set `effect="fade"` to cross-fade between images. The example hides direction arrows to keep the image treatment minimal.

:::demo components/Carousel/effect.vue :::

## Vertical Direction

Set `direction="vertical"` for vertical movement; indicators move to the right edge. After focusing the carousel root, use the arrow, Home, and End keys.

:::demo components/Carousel/vertical.vue :::

## Card

Set `effect="card"` when horizontal space is available. The current image stays centered while the previous and next images remain visible as translucent side previews.

:::demo components/Carousel/card.vue :::

## Vertical Card

Vertical cards combine `direction="vertical"`, `effect="card"`, and `indicator-position="outer-right"`. Set the container height to 1.5 times the card height; this example uses a 300px container with 200px cards.

:::demo components/Carousel/vertical-card.vue :::

## Indicator

Use `indicator-type` to switch between `dot`, `line`, and `slider`, and use `indicator-position` to place the indicator around the carousel. When arrows and side indicators are both visible, the arrow on that side automatically moves inward.

:::demo components/Carousel/indicator.vue :::

## Accessibility

Inactive slides are removed from assistive technology and keyboard navigation. Autoplay should expose a discoverable pause mechanism and remain paused after an explicit user choice.
