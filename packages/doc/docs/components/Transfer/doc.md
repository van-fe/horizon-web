当需要在多个可选项中进行多选时，使用`Transfer`穿梭框可以更直观地在两栏中移动元素，完成选择行为。

比起 `Select` 和 `TreeSelect`，穿梭框占据更大的空间，可以展示可选项的更多信息。

### 基本用法
`Transfer`组件通过`data`属性传入一个对象数组，使用`key`作为数据的唯一标识。右侧列表中的数据项会同步绑定至`v-model`，值为`key`组成的数组。
若希望在初始状态时右侧列表不为空，可为`v-model`绑定的变量赋予一个初始值。

`filterable`默认为`false`，将`filterable`置为`true`开启搜索模式。

`draggable`默认为`false`，将`draggable`置为`true`实现右侧项目可拖拽。

:::demo ./demos/basic.vue :::


### 分类选择

在数据中传入带`isGroup`字段的数据，组件可将其识别为分类标题，使用这种展示模式，可清晰展示无层级的分类数据。

:::demo ./demos/group.vue :::


### 可搜索过滤

也可以使用`filter-method`定义自己的搜索逻辑。`filter-method`接收一个方法，当搜索关键字变化时，会将当前的关键字和每个数据项传给该方法。 若方法返回`true`，则会在搜索结果中显示对应的数据项。

注意：在使用`filter-method`时需要确保`filterable`同时置为`true`。

:::demo ./demos/filter.vue :::


### 右侧列表排序策略

使用`target-order`来控制右侧列表的排序策略，默认为`push`，代表新加入的元素排在右侧列表最后面。若为`original`，则保持与左侧数据源相同的顺序。若为`unshift`，则代表新加入的元素排在右侧列表最前面。

:::demo ./demos/order.vue :::


### 字段映射

配置 `field-map` 来控制映射的字段，从而可以直接使用自定的 `options` 结构而不必改成 `transfer` 指定的字段。

:::demo ./demos/field-map.vue :::


### 人员选择
支持搜索（可选）、人员(名字、附属信息)
:::demo ./demos/people.vue :::



### 组织架构选择
支持搜索（可选）、组织架构路径（可选）、人员（名字、附属信息）、部门（部门名称、部门架构路径）
:::demo ./demos/tree.vue :::



### 表格选择
支持标题&数量（可选）、筛选（可配置）、搜索（可配置）、表格信息（必选、可配置）、分页（可配置）
:::demo ./demos/table.vue :::


### 自定义
可以自定义左右栏展示单个内容项、标题栏、搜索栏、整体内容、页脚、空状态、中间控制。
:::demo ./demos/custom.vue :::