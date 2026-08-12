# List 列表

List 用连续列表展示结构相似的重复内容。

## 数据渲染

传入带类型的数据，并通过 `renderItem` 渲染每一项。

:::react-demo react/components/List/basic.tsx :::

## 内容区域

List 支持头部、尾部和静态子节点；ListItem 提供标题、左侧内容、描述、主体和操作区。

:::react-demo react/components/List/regions.tsx :::

## 限高滚动

设置正数 `maxHeight` 后，长列表会在组件内部滚动。

:::react-demo react/components/List/bounded.tsx :::

## List Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `readonly Item[]` | — | 数据源 |
| `renderItem` | `(item, index) => ReactNode` | — | 项目渲染函数 |
| `children` | `ReactNode` | — | 静态列表内容 |
| `header` / `footer` | `ReactNode` | — | 头部和尾部内容 |
| `zebra` | `boolean` | `false` | 斑马纹 |
| `border` | `boolean` | `false` | 外边框 |
| `split` | `boolean` | `true` | 项目分割线 |
| `maxHeight` | `number` | `0` | 最大高度；非正数表示不限制 |
| `size` | `'small' \| 'medium'` | Provider 尺寸 | 项目间距尺寸 |

## ListItem Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` / `subtitle` | `string` | — | 默认标题和副标题 |
| `titleContent` | `ReactNode` | — | 自定义标题内容 |
| `titleSize` | `'small' \| 'medium'` | Provider 尺寸 | 标题尺寸 |
| `titleBold` | `boolean` | `true` | 默认标题加粗 |
| `describe` | `string` | — | 默认描述 |
| `descriptionContent` | `ReactNode` | — | 自定义描述内容 |
| `leading` / `actions` | `ReactNode` | — | 左侧内容和操作区 |
| `children` | `ReactNode` | — | 项目主体内容 |

两个组件都把 ref 转发到根 `HTMLDivElement`，并接受原生 div 属性。
