import { isObject } from '@aurora/utils';

export const useScrollbarEmits = {
  /**
   * 滚动时触发
   * @param position scrollLeft: 滚动距左; scrollTop 滚动距上
   * @param e 滚动事件
   */
  scroll: (position: { scrollLeft: number; scrollTop: number }, e: Event) =>
    isObject(position) && e instanceof Event,
  /**
   * 当滚动条重新计算时触发
   */
  update: () => true,
  /**
   * 滚动结束时触发
   * @version 2.12.5
   */
  scrollEnd: () => true,
  /**
   * 在触顶时触发
   * @param e 滚动事件
   */
  reachTop: (e: Event) => e instanceof Event,
  /**
   * 在触底时触发
   * @param e 滚动事件
   */
  reachBottom: (e: Event) => e instanceof Event,
  /**
   * 在触左时触发
   * @param e 滚动事件
   */
  reachLeft: (e: Event) => e instanceof Event,
  /**
   * 在触右时触发
   * @param e 滚动事件
   */
  reachRight: (e: Event) => e instanceof Event,
  /**
   * 鼠标进入
   * @param e 鼠标事件
   * @version 2.0.16
   */
  mouseEnter: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标离开
   * @param e 鼠标事件
   * @version 2.0.16
   */
  mouseLeave: (e: MouseEvent) => e instanceof MouseEvent,
};

export type ScrollbarEmits = typeof useScrollbarEmits;
