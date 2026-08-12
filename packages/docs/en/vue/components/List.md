## Basic Usage
Configure whether to display borders, whether to display in zebra pattern, whether to display dividers, etc. according to the props of the list. In addition, based on the list structure, you can use different element elements in different component slots
:::demo vue/components/List/demo1.vue :::

## Demo2
Users can set the size of each list item according to the value of size. At the same time, the previous example shows the List component used together with the `item` slot. This example shows that users can directly use it together with the ListItem component. Users can choose according to the scenario
:::demo vue/components/List/demo2.vue :::

## List Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `unknown[]` | — | Source items used with the `item` slot |
| `zebra` | `boolean` | `false` | Alternating row backgrounds |
| `border` | `boolean` | `false` | Outer border |
| `split` | `boolean` | `true` | Item separators |
| `maxHeight` | `number` | `0` | Maximum scroll height |
| `size` | `'small' \| 'medium'` | Application size | Item spacing size |

## ListItem Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` / `subtitle` | `string` | — | Title and subtitle |
| `titleSize` | `'small' \| 'medium'` | Application size | Title size |
| `titleBold` | `boolean` | `true` | Bold title |
| `describe` | `string` | — | Description text |

## Slots

List provides `default`, `header`, `footer`, and scoped `item` (`{ item, index }`). ListItem provides `default`, `title`, `sider`, `describe`, and `right`.
