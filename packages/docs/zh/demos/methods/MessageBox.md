## 提示框
只有一个按钮，点击按钮后会自动关闭弹窗，你可以在 Promise.resolve 中执行回调函数。
:::demo methods/MessageBox/demo1.vue :::

## 确认框
会有确定和取消两个按钮，点击确定**不会**自动关闭弹窗，你可以在 Promise.resolve 的回调函数中调用接收到的 `close` 方法来关闭弹窗；点击取消会自动关闭弹窗，你可以在 Promise.reject 中执行回调函数。
:::demo methods/MessageBox/demo2.vue :::

## 个性化
你可以传入一个配置对象来个性化弹窗。
:::demo methods/MessageBox/demo3.vue :::

## 与 Button 的防抖函数联合使用
可以给 `okButtonProps` `cancelButtonProps` 传入 `debounceType` `debounceFn` 来开启防抖的监听
:::demo methods/MessageBox/debounce-fn.vue :::

## $alert 重载
`$alert` 包含 5 个重载方法。
```ts
function $alert(content: string): Promise<void>;
function $alert(content: string, options: MsgBoxAlertProps): Promise<void>;
function $alert(content: string, title: string): Promise<void>;
function $alert(content: string, title: string, options: MsgBoxAlertProps): Promise<void>;
function $alert(options: MsgBoxAlertProps): Promise<void>;
```

## $confirm 重载
`$confirm` 包含 5 个重载方法，`resolve` 会传入一个关闭函数，执行该函数可以关闭弹窗。
```ts
function $confirm(content: string): Promise<() => void>;
function $confirm(content: string, options: MsgBoxConfirmProps): Promise<() => void>;
function $confirm(content: string, title: string): Promise<() => void>;
function $confirm(content: string, title: string, options: MsgBoxConfirmProps): Promise<() => void>;
function $confirm(options: MsgBoxConfirmProps): Promise<() => void>;
```
