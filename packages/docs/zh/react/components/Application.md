# Application 应用配置

Application 为后代 Horizon Web 组件提供作用域配置，并且不会增加额外 DOM 包装。

## 应用级配置

通常在产品根节点附近放置一个 Application，用于定义语言、命名空间、默认尺寸、时区显示、路由适配、文案和弹层挂载策略。

:::react-demo react/components/Application/basic.tsx :::

## 嵌套作用域

嵌套 Application 会继承父级配置，只覆盖自身收到的字段。

:::react-demo react/components/Application/nested.tsx :::

## 核心属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `locale` | `string` | 继承 | 语言标识 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 后代组件默认尺寸 |
| `namespace` | `string` | `'H'` | CSS 类命名空间 |
| `showTimeZone` | `boolean \| readonly ('date-picker' \| 'timeline')[]` | `false` | 时区显示范围 |
| `getPopupContainer` | `(trigger?: HTMLElement) => HTMLElement \| null \| undefined` | 继承 | 弹层挂载节点解析器 |
| `children` | `ReactNode` | — | 配置作用域内容 |

Application 同时接受 `HorizonWebProvider` 暴露的路由适配器和文案配置组；二者使用同一个作用域配置上下文。

该组件只渲染子元素，因此不接受原生属性，也不提供 DOM ref。
