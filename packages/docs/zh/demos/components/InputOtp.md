## 基础用法

输入内容会通过 `v-model` 同步；填满所有输入格时触发 `complete` 事件。组件使用单个原生输入承载交互，因此可以直接粘贴完整验证码。

:::demo components/InputOtp/basic.vue :::

## 系统验证码自动填充

组件默认设置 `autocomplete="one-time-code"` 和适合数字验证码的 `inputmode="numeric"`。Safari 在短信格式、Apple 设备接力及系统设置满足条件时，可显示 macOS/iOS 的系统验证码建议；该能力由浏览器和操作系统决定，网页无法强制唤起。建议同时设置稳定的 `name`，并让服务端短信遵循平台要求。

:::demo components/InputOtp/autofill.vue :::

## 掩码、字母数字与禁用状态

使用 `mask` 隐藏视觉字符；将 `type` 设为 `alphanumeric` 后可输入英文字母和数字。

:::demo components/InputOtp/modes.vue :::

## 无障碍

验证码格仅用于视觉展示，辅助技术会读取内部的单个原生输入。请像普通输入框一样，通过 `<label for>`、`aria-label` 或 `aria-labelledby` 提供可访问名称。
