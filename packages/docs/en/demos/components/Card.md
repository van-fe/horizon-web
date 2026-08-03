Card organizes related information and actions into a distinct section. Keep a clear header, body, and footer hierarchy that adapts to narrow and dark themes.

## Basic Configuration

The interactive configurator combines `title`, `border`, dividers, and `radius`.

:::demo components/Card/basic.vue :::

## Body Content

The default slot can contain imagery, activity lists, or tabs. The responsive grid collapses to one column on narrow screens.

:::demo components/Card/content.vue :::

## Custom Header

The header slot can combine a compact action, checkbox, status tag, or icon while retaining a clear text label.

:::demo components/Card/header.vue :::

## Custom Footer

The footer slot fits metadata and actions closely related to the body. The demo reports the publish result below both cards.

:::demo components/Card/footer.vue :::

## Drag and Hover Feedback

Cards can act as draggable business objects or selectable surfaces. Keep motion subtle and respect reduced-motion preferences.

:::demo components/Card/other.vue :::
