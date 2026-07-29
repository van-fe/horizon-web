import { isNumber } from '@aurora/utils';

export const useVirtualScrollerEmits = {
  /**
   * 滚动视口尺寸发生改变时的事件
    * @en Emitted when resize changes.
   */
  resize: () => true,
  /**
   * 组件visible值发生改变时的事件
    * @en Emitted when visible changes.
   */
  visible: () => true,
  /**
   * 组件滚动产生项目位置变化后的事件
   * @param startIndex 已经渲染但没有进入视口的元素的索引值
   * @paramEn startIndex The start index value.
   * @param endIndex 已经渲染但是已经划出视口的元素的索引值
   * @paramEn endIndex The end index value.
   * @param visibleStartIndex 进入视口的起始元素索引值
   * @paramEn visibleStartIndex The visible start index value.
   * @param visibleEndIndex 进入视口的结束元素索引值
   * @paramEn visibleEndIndex The visible end index value.
    * @en Emitted when update changes.
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
   * @paramEn e The e value.
    * @en Emitted when mouse enter changes.
   */
  mouseEnter: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标移出
   * @param e 鼠标事件
   * @paramEn e The e value.
    * @en Emitted when mouse leave changes.
   */
  mouseLeave: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 组件滚动到末尾触发的事件
    * @en Emitted when scroll end changes.
   */
  scrollEnd: () => true,
  /**
   * 组件滚动到起始位置时触发的事件
    * @en Emitted when scroll start changes.
   */
  scrollStart: () => true,
  /**
   * 滚动开始时触发通知
    * @en Emitted when scroll begin changes.
   */
  scrollBegin: () => true,
  /**
   * 滚动结束后触发通知
    * @en Emitted when scroll stop changes.
   */
  scrollStop: () => true,
};

export const useRecycleScrollerEmits = {
  /**
   * 组件visible值发生改变时的事件
    * @en Emitted when visible changes.
   */
  visible: () => true,
  /**
   * 组件隐藏时的事件
    * @en Emitted when hidden changes.
   */
  hidden: () => true,
  /**
   * 滚动视口尺寸发生改变时的事件
    * @en Emitted when resize changes.
   */
  resize: () => true,
  /**
   * 组件滚动产生项目位置变化后的事件
   * @param startIndex 已经渲染但没有进入视口的元素的索引值
   * @paramEn startIndex The start index value.
   * @param endIndex 已经渲染但是已经划出视口的元素的索引值
   * @paramEn endIndex The end index value.
   * @param visibleStartIndex 进入视口的起始元素索引值
   * @paramEn visibleStartIndex The visible start index value.
   * @param visibleEndIndex 进入视口的结束元素索引值
   * @paramEn visibleEndIndex The visible end index value.
    * @en Emitted when update changes.
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
    * @en Emitted when scroll end changes.
   */
  scrollEnd: () => true,
  /**
   * 组件滚动到起始位置时触发的事件
    * @en Emitted when scroll start changes.
   */
  scrollStart: () => true,
  /**
   * 鼠标移入
   * @param e 鼠标事件
   * @paramEn e The e value.
    * @en Emitted when mouse enter changes.
   */
  mouseEnter: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标移出
   * @param e 鼠标事件
   * @paramEn e The e value.
    * @en Emitted when mouse leave changes.
   */
  mouseLeave: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 滚动开始时触发通知
    * @en Emitted when scroll begin changes.
   */
  scrollBegin: () => true,
  /**
   * 滚动结束后触发通知
    * @en Emitted when scroll stop changes.
   */
  scrollStop: () => true,
};

export const useVirtualScrollerItemEmits = {
  /**
   * 元素被监听到尺寸变化时的事件
   * @param id 发生变化的Item的id
   * @paramEn id The id value.
    * @en Emitted when resize changes.
   */
  resize: (id: number) => isNumber(id),
};

export type VirtualScrollerEmits = typeof useVirtualScrollerEmits;
export type RecycleScrollerEmits = typeof useRecycleScrollerEmits;
export type VirtualScrollerItemEmits = typeof useVirtualScrollerItemEmits;
