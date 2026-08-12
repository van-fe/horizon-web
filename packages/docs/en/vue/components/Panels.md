## Use with radio
:::demo vue/components/Panels/basic.vue :::

## Use with tabs
:::demo vue/components/Panels/tab.vue :::

## Vertical Direction
:::demo vue/components/Panels/vertical.vue :::

## Additional Styles
To improve flexibility, panels try not to have irrelevant styles. You can add the styles you want through the utility classes in [Styles & Animation](../../style-animation/center/doc) or `style`.
:::demo vue/components/Panels/style.vue :::

## Panels Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `string \| number` | — | Required current panel key |
| `animated` | `boolean` | `false` | Animates panel changes |
| `vertical` | `boolean` | `false` | Uses vertical instead of horizontal motion |

## Panels Slots

| Slot | Description |
| --- | --- |
| `default` | Composed `HPanel` items |

## Panel Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string \| number` | — | Required unique panel key |
| `disabled` | `boolean` | `false` | Excludes the panel from display |

## Panel Slots

| Slot | Description |
| --- | --- |
| `default` | Panel content |
