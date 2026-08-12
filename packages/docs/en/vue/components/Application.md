## Scoped locale


:::demo vue/components/Application/i18n.vue :::

## Consistent component sizes

Use `size` to give nested controls a consistent scale, such as a compact workspace or a touch-friendly page. Each component still supports the sizes documented by its own API.

:::demo vue/components/Application/size.vue :::

## API Summary

- `locale`, `size`, `namespace`, and `showTimeZone` configure descendants within the Application scope.
- `getPopupContainer` sets the global popup mount resolver used by supported overlay components.
- Application renders only its default slot and does not add a DOM wrapper.
