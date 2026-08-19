import type { FloatButtonCommandMap, FloatButtonGroupCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useFloatButtonExposes = {
  /** 显示悬浮按钮。 @en Shows the floating button. */
  show: Function as ExposeType<FloatButtonCommandMap['show']>,
  /** 隐藏悬浮按钮。 @en Hides the floating button. */
  hide: Function as ExposeType<FloatButtonCommandMap['hide']>,
  /** 聚焦悬浮按钮。 @en Focuses the floating button. */
  focus: Function as ExposeType<FloatButtonCommandMap['focus']>,
};

export const useFloatButtonGroupExposes = {
  /** 显示按钮组。 @en Shows the group. */
  show: Function as ExposeType<FloatButtonGroupCommandMap['show']>,
  /** 隐藏按钮组。 @en Hides the group. */
  hide: Function as ExposeType<FloatButtonGroupCommandMap['hide']>,
  /** 展开按钮组。 @en Expands the group. */
  expand: Function as ExposeType<FloatButtonGroupCommandMap['expand']>,
  /** 折叠按钮组。 @en Folds the group. */
  fold: Function as ExposeType<FloatButtonGroupCommandMap['fold']>,
  /** 切换展开状态。 @en Toggles the group. */
  toggle: Function as ExposeType<FloatButtonGroupCommandMap['toggle']>,
};

export type FloatButtonExposes = ExtractExposeTypes<typeof useFloatButtonExposes>;
export type FloatButtonGroupExposes = ExtractExposeTypes<typeof useFloatButtonGroupExposes>;
