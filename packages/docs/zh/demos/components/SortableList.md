SortableList 用稳定键渲染可拖拽排序的数据列表。拖动时条目本体跟随指针，并使用与 Tree 一致的高亮横条提示最终落点；松手更新顺序后，各条目通过 FLIP 过渡平滑归位。

## 基础用法

通过 `v-model` 接收排序后的数组，`item-key` 必须指向稳定且唯一的键。默认从手柄开始拖拽；手柄获得焦点后，也可使用方向键、Home 和 End 排序。`item-disabled` 可锁定单个条目。

:::demo components/SortableList/basic.vue :::

## 整行拖拽

设置 `drag-on-handler="false"` 后，可从整行任意空白位置开始拖拽；`handle` 插槽仍可自定义视觉提示和键盘操作入口。

:::demo components/SortableList/whole-row.vue :::
