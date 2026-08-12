## 基本用法
根据列表的props是配置是否显示边框，是否以斑马纹的形式显示，是否显示分割线等等，另外在列表结构的基础上可以利用在不同的组件插槽中添加不同的element元素
:::demo vue/components/List/demo1.vue :::

## Demo2
用户可以根据size的值来设置各个列表项的size，与此同时，在上个示例中展示了List组件与`item` 插槽同时使用，这个示例展示用户可以直接结合ListItem组件进行使用，用户可以结合场景自行选用
:::demo vue/components/List/demo2.vue :::

## List Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `unknown[]` | — | 与 `item` 插槽配合的数据源 |
| `zebra` | `boolean` | `false` | 斑马纹 |
| `border` | `boolean` | `false` | 外边框 |
| `split` | `boolean` | `true` | 项目分割线 |
| `maxHeight` | `number` | `0` | 最大滚动高度 |
| `size` | `'small' \| 'medium'` | Application 尺寸 | 项目间距尺寸 |

## ListItem Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` / `subtitle` | `string` | — | 标题和副标题 |
| `titleSize` | `'small' \| 'medium'` | Application 尺寸 | 标题尺寸 |
| `titleBold` | `boolean` | `true` | 标题加粗 |
| `describe` | `string` | — | 描述文字 |

## Slots

List 提供 `default`、`header`、`footer` 和作用域 `item`（`{ item, index }`）；ListItem 提供 `default`、`title`、`sider`、`describe` 和 `right`。
