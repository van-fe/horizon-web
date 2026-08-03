## Basic usage

Place multiple `h-carousel-item` components inside `h-carousel`. A slide can contain imagery, cards or any custom content.

:::demo components/Carousel/basic.vue :::

## Autoplay

Autoplay is enabled by default and `interval` controls its timing. Rotation pauses on hover, when the page is hidden, or when focus enters the carousel. The top-right control explicitly pauses or resumes it.

:::demo components/Carousel/autoplay.vue :::

## Fade, controlled index and methods

Use `v-model` to control the active index and `effect="fade"` for a cross-fade transition. The instance exposes `prev`, `next`, `setActiveItem`, `pause` and `play`.

:::demo components/Carousel/effect.vue :::

## Vertical direction

Set `direction="vertical"` for vertical movement. Touch swipes are supported; when the carousel has focus, use the directional, Home and End keys to navigate.

:::demo components/Carousel/vertical.vue :::

## Accessibility

Autoplay includes a dedicated pause/resume control and does not restart by itself after focus enters. Inactive slides are hidden from assistive technology and keyboard navigation. Give the carousel a purpose-specific `aria-label` and each slide a concise `label`.
