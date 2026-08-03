## 位置
依据 `top` `right` `bottom` `left` `top-start` `top-end` `bottom-start` `bottom-end` 修饰符控制显示方向
:::demo directives/v-tooltip/placement.vue :::

## 状态
依据 `disabled` 修饰符控制能否触发显示，依据 `visible` 修饰符控制是否显示，根据 `hover` `click` `focus` `manual` 修饰符控制触发条件
:::demo directives/v-tooltip/trigger.vue :::

## 样式
自 `2.7.0` 开始， 依据 `medium` `small` 修饰符控制显示尺寸，依据 `dark` `light` 修饰符控制显示主题
:::demo directives/v-tooltip/style.vue :::

## 配置方式
可以传入 `object` 来控制 `v-tooltip` 显示
:::demo directives/v-tooltip/options.vue :::

## Modifiers

| 修饰符                                                                                    | 说明                                   |
|----------------------------------------------------------------------------------------|--------------------------------------|
| top \| right \| bottom \| left \| left-top \| right-top \| left-bottom \| right-bottom | 在目标元素上(右/下/左/左上/右上/左下/右下)方弹出 tooltip |
| hover \| click \| focus \| manual                                                      | 鼠标悬浮(点击/受焦/右键)目标元素触发 tooltip         |
| disabled                                                                               | 禁止 tooltip 弹出                        |
| visible                                                                                | 显示 tooltip                           |
| overflow                                                                               | 文字溢出显示 tooltip                       |
| medium \| small                                                                        | 尺寸 |
| dark \| light                                                                          | 主题 |
