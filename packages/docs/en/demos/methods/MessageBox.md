## Alert Box
There is only one button. After clicking the button, the popup will automatically close. You can execute the callback function in Promise.resolve.
:::demo methods/MessageBox/demo1.vue :::

## Confirm Box
There are two buttons: confirm and cancel. Clicking confirm will **not** automatically close the popup. You can call the received `close` method in the Promise.resolve callback function to close the popup; clicking cancel will automatically close the popup, and you can execute the callback function in Promise.reject.
:::demo methods/MessageBox/demo2.vue :::

## Personalization
You can pass in a configuration object to personalize the popup.
:::demo methods/MessageBox/demo3.vue :::

## Used Together with Button's Debounce Function
You can pass `debounceType` `debounceFn` to `okButtonProps` `cancelButtonProps` to enable debounce listening
:::demo methods/MessageBox/debounce-fn.vue :::

## $alert Overload
`$alert` contains 5 overload methods.
```ts
function $alert(content: string): Promise<void>;
function $alert(content: string, options: MsgBoxAlertProps): Promise<void>;
function $alert(content: string, title: string): Promise<void>;
function $alert(content: string, title: string, options: MsgBoxAlertProps): Promise<void>;
function $alert(options: MsgBoxAlertProps): Promise<void>;
```

## $confirm Overload
`$confirm` contains 5 overload methods. `resolve` will pass in a close function, and executing this function can close the popup.
```ts
function $confirm(content: string): Promise<() => void>;
function $confirm(content: string, options: MsgBoxConfirmProps): Promise<() => void>;
function $confirm(content: string, title: string): Promise<() => void>;
function $confirm(content: string, title: string, options: MsgBoxConfirmProps): Promise<() => void>;
function $confirm(options: MsgBoxConfirmProps): Promise<() => void>;
```
