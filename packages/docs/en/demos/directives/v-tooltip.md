## Position
Control display direction based on `top` `right` `bottom` `left` `top-start` `top-end` `bottom-start` `bottom-end` modifiers
:::demo directives/v-tooltip/placement.vue :::

## State
Control whether it can be triggered to display based on the `disabled` modifier, control whether it is displayed based on the `visible` modifier, and control trigger conditions based on `hover` `click` `focus` `manual` modifiers
:::demo directives/v-tooltip/trigger.vue :::

## Style
Since `2.7.0`, control display size based on `medium` `small` modifiers, control display theme based on `dark` `light` modifiers
:::demo directives/v-tooltip/style.vue :::

## Configuration Method
You can pass in an `object` to control `v-tooltip` display
:::demo directives/v-tooltip/options.vue :::

## Modifiers

| Modifier                                                                                    | Description                                   |
|----------------------------------------------------------------------------------------|--------------------------------------|
| top \| right \| bottom \| left \| left-top \| right-top \| left-bottom \| right-bottom | Pop up tooltip above (right/below/left/top-left/top-right/bottom-left/bottom-right) the target element |
| hover \| click \| focus \| manual                                                      | Mouse hover (click/focus/right-click) target element to trigger tooltip         |
| disabled                                                                               | Disable tooltip popup                        |
| visible                                                                                | Display tooltip                           |
| overflow                                                                               | Display tooltip when text overflows                       |
| medium \| small                                                                        | Size |
| dark \| light                                                                          | Theme |
