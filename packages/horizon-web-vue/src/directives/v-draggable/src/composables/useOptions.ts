import type { DirectiveOptionType, ExtractDirectiveOptionTypes } from '@aurora/utils';
import { declareDirectiveOptionType } from '@aurora/utils';

export const useDraggableOptions = declareDirectiveOptionType({
  /**
   * 允许拖动
   * @en Allow drag
   */
  enabled: {
    type: Boolean as DirectiveOptionType<boolean>,
    default: true,
  },
  /**
   * 元素的定位方式，默认是 `absolute`，某些情况下你可能需要 `fixed`。
   * @en Element positioning mode; use fixed when needed
   */
  position: {
    type: String as DirectiveOptionType<'absolute' | 'fixed'>,
    default: 'absolute',
  },
  /**
   * 开始移动时的回调函数
   * @en Start 移动时的callback
   * @param e 鼠标事件
   * @paramEn e Mouseevent
   */
  onMoveStart: {
    type: Function as DirectiveOptionType<(e: MouseEvent) => void>,
    required: false,
  },
  /**
   * 移动过程中的回调函数
   * @en Callback invoked while the element is being moved
   * @param clientX 触发点相对浏览器可视区域左侧距离
   * @paramEn clientX Trigger 点相对浏览器可视区域左侧distance
   * @param clientY 触发点相对浏览器可视区域上侧距离
   * @paramEn clientY Trigger 点相对浏览器可视区域上侧distance
   * @param e 鼠标事件
   * @paramEn e Mouse event
   */
  onMove: {
    type: Function as DirectiveOptionType<
      (clientX: number, clientY: number, e: MouseEvent) => void
    >,
    required: false,
  },
  /**
   * 移动结束的回调函数
   * @en Callback invoked when movement ends
   * @param e 鼠标事件
   * @paramEn e Mouse event
   */
  onMoveEnd: {
    type: Function as DirectiveOptionType<(e: MouseEvent) => void>,
    required: false,
  },
});

export type DraggableOptions = ExtractDirectiveOptionTypes<typeof useDraggableOptions>;
