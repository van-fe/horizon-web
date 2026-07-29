import { isObject } from '@aurora/utils';

export const useScrollbarEmits = {
  /**
   * 滚动时触发
   * @param position scrollLeft: 滚动距左; scrollTop 滚动距上
   * @paramEn position The position value.
   * @param e 滚动事件
   * @paramEn e The e value.
    * @en Emitted when scroll changes.
   */
  scroll: (position: { scrollLeft: number; scrollTop: number }, e: Event) =>
    isObject(position) && e instanceof Event,
  /**
   * 当滚动条重新计算时触发
    * @en Emitted when update changes.
   */
  update: () => true,
  /**
   * 滚动结束时触发
    * @en Emitted when scroll end changes.
   */
  scrollEnd: () => true,
  /**
   * 在触顶时触发
   * @param e 滚动事件
   * @paramEn e The e value.
    * @en Emitted when reach top changes.
   */
  reachTop: (e: Event) => e instanceof Event,
  /**
   * 在触底时触发
   * @param e 滚动事件
   * @paramEn e The e value.
    * @en Emitted when reach bottom changes.
   */
  reachBottom: (e: Event) => e instanceof Event,
  /**
   * 在触左时触发
   * @param e 滚动事件
   * @paramEn e The e value.
    * @en Emitted when reach left changes.
   */
  reachLeft: (e: Event) => e instanceof Event,
  /**
   * 在触右时触发
   * @param e 滚动事件
   * @paramEn e The e value.
    * @en Emitted when reach right changes.
   */
  reachRight: (e: Event) => e instanceof Event,
  /**
   * 鼠标进入
   * @param e 鼠标事件
   * @paramEn e The e value.
    * @en Emitted when mouse enter changes.
   */
  mouseEnter: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标离开
   * @param e 鼠标事件
   * @paramEn e The e value.
    * @en Emitted when mouse leave changes.
   */
  mouseLeave: (e: MouseEvent) => e instanceof MouseEvent,
};

export type ScrollbarEmits = typeof useScrollbarEmits;
