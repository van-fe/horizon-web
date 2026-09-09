# Tag 标签

Tag 用于标记对象的类别、状态或属性；TagGroup 提供创建、编辑、关闭与溢出折叠能力。React 实现使用原生语义元素，并把激活状态作为受控提案交给应用。

## 基本用法

:::react-demo react/components/Tag/basic.tsx :::

## 语义类型

:::react-demo react/components/Tag/type.tsx :::

## 低强调样式

:::react-demo react/components/Tag/plain.tsx :::

## 形状

:::react-demo react/components/Tag/shape.tsx :::

## 自定义颜色

`color` 会生成完整的交互色阶，也可配合 `background` 指定背景。

:::react-demo react/components/Tag/colorful.tsx :::

## 图标

:::react-demo react/components/Tag/icon.tsx :::

## 头像

:::react-demo react/components/Tag/avatar.tsx :::

## 受控激活

`active` 不会被组件内部改写；应用在 `onActiveChange` 中接受或拒绝提案。

:::react-demo react/components/Tag/active.tsx :::

## 可关闭标签

:::react-demo react/components/Tag/closable.tsx :::

## 禁用

:::react-demo react/components/Tag/disabled.tsx :::

## 加载状态

:::react-demo react/components/Tag/loading.tsx :::

## 创建与编辑

TagGroup 的 `beforeCreate`、`beforeEdit` 与 `beforeClose` 支持同步或异步守卫。等待期间会阻止重复提交。

:::react-demo react/components/Tag/create-update.tsx :::

## 折叠标签组

:::react-demo react/components/Tag/collapse.tsx :::

## 主要 API

Tag 支持 `active`、`variant`、`size`、`clickable`、`closable`、`editable`、`disabled`、`plain`、`round`、`equally`、`color`、`background`、`loading` 与 Tooltip 参数。`onActiveChange`、`onClick`、`onClose` 分别报告选择、主体操作和关闭操作；`TagHandle.edit()` 进入编辑状态。

TagGroup 支持 `collapse`、`expand`、`minDisplayed`、`useCreate`、`maxTags` 与三个异步守卫，并通过 `onCreated`、`onEdited`、`onClosed`、`onToggled`、`onExceeded` 报告结果。`TagGroupHandle` 暴露 `toggle()` 与 `calculate()`。

## 无障碍与 Provider

带 `active` 的标签使用 checkbox 语义，可操作标签支持 Enter 与 Space。关闭操作是独立原生按钮，禁用与等待状态通过 ARIA 暴露。`HorizonWebProvider.tagLabels` 可配置创建、关闭、展开与收起文案。
