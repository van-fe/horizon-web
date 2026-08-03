## 基础表单

`h-form-item` 负责标签、提示和控件布局。示例使用响应式网格组织一份发布简报。

:::demo components/Form/basic.vue :::

## 尺寸

`h-form` 的 `size` 会传递给内部表单控件，并覆盖 `h-application` 的全局尺寸。

:::demo components/Form/size.vue :::

## 帮助提示

`helper` 提供弹出式说明，`helper-placement` 控制其位于标签前、标签后或表单项右侧；主题可由表单统一配置。

:::demo components/Form/tips-helper.vue :::

## 标签布局

`label-position` 控制顶部或左侧标签；左侧模式还可配置水平、垂直对齐方式。

:::demo components/Form/label-position.vue :::

## 行内表单

`inline` 适合较少且紧凑的筛选字段，并会在窄屏自然换行。

:::demo components/Form/inline.vue :::

## 表单验证

为 `h-form` 提供 `model`，再通过表单项的 `prop` 与 `rules` 关联字段。规则语法兼容 async-validator。

:::demo components/Form/validate.vue :::

## 清除验证与重置

`clearValidate` 仅清除验证信息并保留值；`resetFields` 同时恢复初始值和验证状态。

:::demo components/Form/clear-validate.vue :::

## 根据验证状态提交

监听 `validate` 事件可汇总字段状态，并在必填字段全部有效后启用提交按钮。

:::demo components/Form/validate-with-submit.vue :::

## 动态表单项

动态列表需要稳定的渲染键，以及与数组索引对应的 `prop`，例如 `reviewers[0].email`。

:::demo components/Form/dynamic-change-item-amount.vue :::

## 验证触发时机

表单级 `validate-trigger` 提供默认时机，表单项可以单独覆盖为 `change`、`blur` 或两者组合。

:::demo components/Form/validate-trigger.vue :::

## 仅渲染模式

`only-render` 适合由外部表单框架负责验证的场景。通过表单项的 `error` 显示外部错误，不触发 Form 自身验证事件。

:::demo components/Form/only-render.vue :::

## 接入自定义控件

自定义控件可以注入 `HFormItemTriggerInjectedKey`，在值变化和失焦时通知 Form；错误状态可通过 `HFormItemErrorInjectedKey` 获取。

:::demo components/Form/custom-form.vue :::

## 内置必填验证

表单项的 `required` 会使用当前国际化文案。开启 `required-use-label` 后，默认消息会引用可见标签。

:::demo components/Form/build-in-required.vue :::

## 全局禁用

表单的 `disabled` 会统一覆盖内部控件状态，适合锁定已提交或只读的工作流。

:::demo components/Form/disabled.vue :::

## 紧凑间距

`spacing="compact"` 缩短表单项间距，并有意隐藏提示和错误行；切换回默认间距即可查看消息。

:::demo components/Form/compact.vue :::

## 标签尾部内容

标签位于顶部时，可使用 `labelAppend` 插槽放置与该字段直接相关的轻量操作。

:::demo components/Form/label-append.vue :::
