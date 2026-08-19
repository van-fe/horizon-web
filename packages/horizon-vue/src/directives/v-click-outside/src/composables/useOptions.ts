import type { ExtractDirectiveOptionTypes } from '@aurora/utils';
import { declareDirectiveOptionType, isNull } from '@aurora/utils';

/**
 * 点击目标元素外部区域时调用的函数
 * @en Function invoked when clicking outside the target element
 * @param target 事件作用元素
 * @paramEn target Event作用element
 * @param evt 触发事件
 * @paramEn evt Triggered mouse event
 */
export const useClickOutsideOptions = declareDirectiveOptionType(
  (target: EventTarget | null, evt: MouseEvent) =>
    (target instanceof EventTarget || isNull(target)) && evt instanceof MouseEvent,
);

export type ClickOutsideOptions = ExtractDirectiveOptionTypes<typeof useClickOutsideOptions>;
