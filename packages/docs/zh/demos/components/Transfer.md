Transfer 用于在两个列表间分配条目，`v-model` 保存右侧条目的 `key`。

## 基础选择

使用 `titles` 命名两侧列表；`filterable` 提供搜索，禁用条目仍会保留上下文。

:::demo components/Transfer/basic.vue :::

## 分组数据

将 `isGroup` 条目作为只读分组标题，帮助用户浏览较长列表。

:::demo components/Transfer/group.vue :::

## 单选分配

通过 `leftBody` 插槽组合单选控件，可将目标限制为一个条目。

:::demo components/Transfer/radio.vue :::

## 自定义人员条目

`item` 插槽可补充头像和团队信息，函数形式的 `filterable` 可自定义搜索逻辑。

:::demo components/Transfer/people.vue :::

## 树形数据

传入嵌套 `children` 后，可逐级浏览并选择团队或成员。

:::demo components/Transfer/tree.vue :::

## 目标排序

开启 `draggable` 后，可以直接调整右侧条目顺序。拖拽时会显示明确的插入位置，松手后条目会通过与 SortableList 相同的 FLIP 动画平滑移动到新顺序。

:::demo components/Transfer/drag.vue :::

## 自定义面板

使用头部、内容和控制区插槽，可将两侧列表替换为表格等业务视图。

:::demo components/Transfer/table.vue :::
