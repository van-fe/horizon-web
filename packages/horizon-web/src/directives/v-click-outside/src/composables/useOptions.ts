import type { ExtractDirectiveOptionTypes } from '@aurora/shared';
import { declareDirectiveOptionType, isNull } from '@aurora/shared';

/**
 * 点击目标元素外部区域时调用的函数
 * @param target 事件作用元素
 */
export const useClickOutsideOptions = declareDirectiveOptionType(
  (target: EventTarget | null, evt: MouseEvent) =>
    (target instanceof EventTarget || isNull(target)) && evt instanceof MouseEvent,
);

export type ClickOutsideOptions = ExtractDirectiveOptionTypes<typeof useClickOutsideOptions>;
