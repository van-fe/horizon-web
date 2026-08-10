# Button 按钮

Button 用于触发即时操作，支持原生按钮、原生链接、应用导航和防重复异步操作。

## 基础用法

```tsx
import { Button } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';
```

:::react-demo react/components/Button/basic.tsx :::

## 导航

`href` 创建原生链接并保留浏览器默认行为。`to` 交给 `HorizonWebProvider` 的 `navigate` adapter，适合接入应用路由。

```tsx
<HorizonWebProvider navigate={(to, options) => router.navigate(to, options)}>
  <Button to="/projects">项目列表</Button>
</HorizonWebProvider>
```

## 异步操作

`asyncAction` 在 Promise 完成前阻止重复触发。`asyncState="loading"` 显示加载态，`asyncState="disabled"` 使用禁用态；操作完成或失败时分别调用 `onActionFinished`、`onActionError`。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'normal' \| 'danger'` | `'primary'` | 视觉意图 |
| `size` | `'huge' \| 'large' \| 'medium' \| 'small'` | `'medium'` | 按钮尺寸 |
| `round` | `boolean` | `false` | 使用椭圆外观 |
| `plain` | `boolean` | `false` | 使用简洁外观 |
| `ghost` | `boolean` | `false` | 使用幽灵外观 |
| `text` | `boolean` | `false` | 使用文字按钮外观 |
| `link` | `boolean` | `false` | 使用链接外观 |
| `block` | `boolean` | `false` | 填满容器宽度 |
| `active` | `boolean` | `false` | 显示激活态 |
| `loading` | `boolean` | `false` | 显示加载态 |
| `disabled` | `boolean` | `false` | 禁止交互 |
| `autoFit` | `boolean` | `false` | 按内容收缩 |
| `borderStyle` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | 边框样式 |
| `icon` | `ReactNode` | — | 前置图标 |
| `suffix` | `ReactNode` | — | 后置内容 |
| `href` | `string` | — | 原生链接地址 |
| `target` | `HTMLAnchorElement['target']` | `'_self'` | 链接打开目标 |
| `to` | `unknown` | — | Provider navigation adapter 的目标 |
| `replace` | `boolean` | `false` | 替换当前导航记录 |
| `asyncAction` | `() => unknown \| PromiseLike<unknown>` | — | 防重复异步操作 |
| `asyncState` | `'none' \| 'loading' \| 'disabled'` | `'none'` | 异步执行期间的视觉状态 |
| `children` | `ReactNode` | — | 按钮内容 |

组件同时接受适用的原生 `button` 属性，并通过 `ref` 暴露实际的 `HTMLButtonElement` 或 `HTMLAnchorElement`。

## Callbacks

| 回调 | 类型 | 说明 |
| --- | --- | --- |
| `onClick` | `(event: MouseEvent<HTMLElement>) => void` | 普通按钮操作 |
| `onActionFinished` | `() => void` | 异步操作成功完成 |
| `onActionError` | `(error: unknown) => void` | 异步操作失败 |
