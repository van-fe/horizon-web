## Image and group avatars

A personal avatar can choose from `random-src` candidates. Pass an image array to `src` to compose a group avatar with up to nine members.

:::demo components/Avatar/normal.vue :::

## Size and image fit

`size` accepts named presets or a custom pixel value. In image mode, use `fit` to control the native `object-fit` behavior inside the avatar.

:::demo components/Avatar/type.vue :::

## Work and text avatars

Set `type="work"` to represent a team or department with an icon or text. Use Horizon semantic tokens for custom colors so the result works in light and dark themes.

:::demo components/Avatar/work.vue :::

## Image fallbacks

When an image fails, provide a `default` resource, replace the URL from the `error` event, or fully customize the result through the `error` slot. The demo uses a missing local path for deterministic feedback without an external service.

:::demo components/Avatar/error.vue :::
