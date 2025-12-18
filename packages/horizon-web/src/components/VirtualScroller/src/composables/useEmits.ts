import { isNumber } from '@aurora/shared';

export const useVirtualScrollerEmits = {
  /**
   * 滚动视口尺寸发生改变时的事件
   */
  resize: () => true,
  /**
   * 组件visible值发生改变时的事件
   */
  visible: () => true,
  /**
   * 组件滚动产生项目位置变化后的事件
   * @param startIndex 已经渲染但没有进入视口的元素的索引值
   * @param endIndex 已经渲染但是已经划出视口的元素的索引值
   * @param visibleStartIndex 进入视口的起始元素索引值
   * @param visibleEndIndex 进入视口的结束元素索引值
   * @version 2.7.0
   */
  update: (
    startIndex: number,
    endIndex: number,
    visibleStartIndex: number,
    visibleEndIndex: number,
  ) =>
    isNumber(startIndex) ||
    isNumber(endIndex) ||
    isNumber(visibleStartIndex) ||
    isNumber(visibleEndIndex),
  /**
   * 鼠标移入
   * @param e 鼠标事件
   * @version 2.7.0
   */
  mouseEnter: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标移出
   * @param e 鼠标事件
   * @version 2.7.0
   */
  mouseLeave: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 组件滚动到末尾触发的事件
   * @version 2.9.1
   */
  scrollEnd: () => true,
  /**
   * 组件滚动到起始位置时触发的事件
   * @version 2.9.1
   */
  scrollStart: () => true,
  /**
   * 滚动开始时触发通知
   * @version 2.12.5
   */
  scrollBegin: () => true,
  /**
   * 滚动结束后触发通知
   * @version 2.12.5
   */
  scrollStop: () => true,
};

export const useRecycleScrollerEmits = {
  /**
   * 组件visible值发生改变时的事件
   */
  visible: () => true,
  /**
   * 组件隐藏时的事件
   */
  hidden: () => true,
  /**
   * 滚动视口尺寸发生改变时的事件
   */
  resize: () => true,
  /**
   * 组件滚动产生项目位置变化后的事件
   * @param startIndex 已经渲染但没有进入视口的元素的索引值
   * @param endIndex 已经渲染但是已经划出视口的元素的索引值
   * @param visibleStartIndex 进入视口的起始元素索引值
   * @param visibleEndIndex 进入视口的结束元素索引值
   */
  update: (
    startIndex: number,
    endIndex: number,
    visibleStartIndex: number,
    visibleEndIndex: number,
  ) =>
    isNumber(startIndex) ||
    isNumber(endIndex) ||
    isNumber(visibleStartIndex) ||
    isNumber(visibleEndIndex),
  /**
   * 组件滚动到末尾触发的事件
   */
  scrollEnd: () => true,
  /**
   * 组件滚动到起始位置时触发的事件
   */
  scrollStart: () => true,
  /**
   * 鼠标移入
   * @param e 鼠标事件
   */
  mouseEnter: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标移出
   * @param e 鼠标事件
   */
  mouseLeave: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 滚动开始时触发通知
   * @version 2.12.5
   */
  scrollBegin: () => true,
  /**
   * 滚动结束后触发通知
   * @version 2.12.5
   */
  scrollStop: () => true,
};

export const useVirtualScrollerItemEmits = {
  /**
   * 元素被监听到尺寸变化时的事件
   * @param id 发生变化的Item的id
   */
  resize: (id: number) => isNumber(id),
};

export type VirtualScrollerEmits = typeof useVirtualScrollerEmits;
export type RecycleScrollerEmits = typeof useRecycleScrollerEmits;
export type VirtualScrollerItemEmits = typeof useVirtualScrollerItemEmits;
