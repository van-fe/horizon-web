import { isNumber } from '@aurora/utils';

export const useChatBubbleListEmits = {
  /**
   * 虚拟列表渲染范围变化时触发
   * @param startIndex 预渲染范围起始索引
   * @paramEn startIndex Start index of the rendered range.
   * @param endIndex 预渲染范围结束索引
   * @paramEn endIndex End index of the rendered range.
   * @param visibleStartIndex 可视范围起始索引
   * @paramEn visibleStartIndex Start index of the visible range.
   * @param visibleEndIndex 可视范围结束索引
   * @paramEn visibleEndIndex End index of the visible range.
   * @en Emitted when the virtual rendering range changes.
   */
  update: (
    startIndex: number,
    endIndex: number,
    visibleStartIndex: number,
    visibleEndIndex: number,
  ) => [startIndex, endIndex, visibleStartIndex, visibleEndIndex].every(value => isNumber(value)),
  /**
   * 滚动到列表顶部时触发
   * @en Emitted when the list reaches the start.
   */
  reachStart: () => true,
  /**
   * 滚动到列表底部时触发
   * @en Emitted when the list reaches the end.
   */
  reachEnd: () => true,
};

export type ChatBubbleListEmits = typeof useChatBubbleListEmits;
