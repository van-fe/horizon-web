import type { DirectiveOptionType, ExtractDirectiveOptionTypes } from '@nio-fe/shared';
import { declareDirectiveOptionType } from '@nio-fe/shared';

export const useDraggableOptions = declareDirectiveOptionType({
  /**
   * 允许拖动
   */
  enabled: {
    type: Boolean as DirectiveOptionType<boolean>,
    default: true,
  },
  /**
   * 元素的定位方式，默认是 `absolute`，某些情况下你可能需要 `fixed`。
   */
  position: {
    type: String as DirectiveOptionType<'absolute' | 'fixed'>,
    default: 'absolute',
  },
  /**
   * 开始移动时的回调函数
   * @param e 鼠标事件
   */
  onMoveStart: {
    type: Function as DirectiveOptionType<(e: MouseEvent) => void>,
    required: false,
  },
  /**
   * 移动过程中的回调函数
   * @param clientX 触发点相对浏览器可视区域左侧距离
   * @param clientY 触发点相对浏览器可视区域上侧距离
   * @param e 鼠标事件
   */
  onMove: {
    type: Function as DirectiveOptionType<
      (clientX: number, clientY: number, e: MouseEvent) => void
    >,
    required: false,
  },
  /**
   * 移动结束的回调函数
   * @param e 鼠标事件
   */
  onMoveEnd: {
    type: Function as DirectiveOptionType<(e: MouseEvent) => void>,
    required: false,
  },
});

export type DraggableOptions = ExtractDirectiveOptionTypes<typeof useDraggableOptions>;
