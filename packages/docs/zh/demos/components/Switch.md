Switch 在 React 中同时支持受控和非受控模式，并继续使用原生 checkbox 提供键盘、表单和辅助技术语义。

## React 用法

```tsx
import { Switch } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';

function Example() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      beforeChange={nextValue => confirmPreference(nextValue)}
      label="自动更新"
      onChange={setEnabled}
      status
      value={enabled}
    />
  );
}
```

使用 `value` + `onChange` 进入受控模式；只提供 `defaultValue` 时由组件维护状态。只读状态使用 React 原生属性命名 `readOnly`。

## 基础用法
:::demo components/Switch/basic.vue :::

## 标签位置
可以通过配置 `label-position` 控制标签的位置
:::demo components/Switch/labelPosition.vue :::

## 内部状态文字
设置 `status-position="inside"` 可将状态文字展示在开关轨道内部。内部空间有限，建议使用简短文字。
:::demo components/Switch/insideText.vue :::

## 尺寸
提供了 `medium/small` 两种尺寸
:::demo components/Switch/size.vue :::

## 禁用和只读
使用 `disabled` 和 `readonly` 控制是否禁用和只读
:::demo components/Switch/disabled.vue :::

## 拦截修改
配置 `before-change`，可以拦截是否允许改变值
:::demo components/Switch/beforeChange.vue :::
