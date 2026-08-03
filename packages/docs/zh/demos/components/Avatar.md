## 图片与群组头像

单人头像可以从 `random-src` 候选资源中选择；向 `src` 传入图片数组时，会自动合成为最多 9 人的群组头像。

:::demo components/Avatar/normal.vue :::

## 尺寸与图片适应

`size` 支持预设规格和自定义像素值。图片模式下可用 `fit` 控制资源在头像容器中的 `object-fit` 行为。

:::demo components/Avatar/type.vue :::

## 工作与文字头像

设置 `type="work"` 后，可使用图标或文字表达团队、部门等非个人实体。自定义颜色时建议使用 Horizon 语义 token，以适配明暗主题。

:::demo components/Avatar/work.vue :::

## 加载失败兜底

图片加载失败时，可以使用 `default` 资源、监听 `error` 替换地址，或通过 `error` 插槽完全自定义内容。示例使用本地缺失地址，反馈稳定且不依赖外部服务。

:::demo components/Avatar/error.vue :::
