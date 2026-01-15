## Basic Usage
The simplest usage, the size of the floating layer is determined by the content area.

:::demo components/Popover/basic.vue :::

## Trigger Method
There are 6 trigger methods to choose from: hover, click, click-remain, click-hide, focus, manual;

click-remain means the popper remains displayed after clicking the popper, click-hide means the popper is hidden after clicking the popper, click has the same behavior as click-hide;

focus means mouse down state

:::demo components/Popover/trigger.vue :::

## Position
There are 15 position strategies to choose from. You can use top, bottom, left, right and auto to express the main direction of popup, plus an auxiliary flag start and end to express the alignment of the popper. For example, top-start means popup at the top, aligned to the start direction (left);

Without auxiliary alignment flags, it defaults to center alignment

The following demo sets flip: false to illustrate the position where the popper is displayed

:::demo components/Popover/position.vue :::

## PopContent Component
The preset styles of the Popper part of Popover are attached to the PopContent component. If you need to completely customize the styles of the Popper part, you can not use the PopContent component

When completely customizing the styles of the Popper part, you need to pay attention to the styles of the small triangle. You can use CSS variables to set the color and size of the small triangle

:::demo components/Popover/pop-content.vue :::

## popperClass and popperStyle
You can use popperClass to mount the class of the popper part, but pay attention to CSS selectors; you can also use popperStyle to mount some styles 

The popper itself does not have a z-index attribute, it is entirely calculated by the fixed position, so if used in scenarios similar to dialog, you can set the toBody attribute to false to make the popper an element inside the dialog, and it will not be affected by the z-index of the dialog. You can also use z-index styles for processing

:::demo components/Popover/popper-class.vue :::

## Delay
You can set the value of hoverHideDelay to adjust the delay time for the popper to hide after the mouse leaves the reference. This value will affect whether the popper will hide during the process of moving the mouse from the reference to the popper, so try not to set it too short

You can set the value of hoverShowDelay to adjust the delay time for the popper to appear after the mouse enters the reference

:::demo components/Popover/delay.vue :::

## Offset
You can use distance and skidding to fine-tune the popup position of the popper

distance represents the offset of the popper in the main direction. A positive value means the popper is away from the reference, and a negative value means the popper is close to the reference;

reference skidding represents the offset of the popper in the auxiliary direction. A positive value means the popper is offset in the end direction, and a negative value means the popper is offset in the start direction;

:::demo components/Popover/offset.vue :::

## Flip
When the space at the display position is insufficient, you can allow the popper to be displayed at the opposite position by setting the flip attribute. It is enabled by default. When all directions cannot be satisfied, you can prevent the popover from being cut off through `preventOverflow`

You can adjust the flip position by setting fallbackPlacements. For example, if the top and bottom positions are not enough to display and you want to display on the left, you can set fallbackPlacements to ['top', 'bottom', 'left']

:::demo components/Popover/flip.vue :::

## Complex Situations and Nesting
If there are multiple layers of popover nesting, or components implemented with popover inside the popover popup layer, you should pay attention to the inner popover or component. If rendered on the body, it will scroll with the body. It is best to set to-body=false

In the following example, because the select's option responds to the mousedown event, and the option that pops up immediately disappears after mousedown is completed, the mouseup event will be triggered on the document, causing the outer popover to think that the user clicked an area outside the popover and hide the popup layer. Similar situations can set the hide-event-type event of the popover

:::demo components/Popover/complex.vue :::

## Arrow
Do not use small triangle
:::demo components/Popover/arrow.vue :::

## Disabled State
You can set `disabled` to control whether it is disabled
:::demo components/Popover/disabled.vue :::

## Mask
You can set `showWithMask` to set whether to display a mask when the popper is displayed
:::demo components/Popover/mask.vue :::

## Custom Close Configuration

:::demo components/Popover/close-trigger.vue :::
