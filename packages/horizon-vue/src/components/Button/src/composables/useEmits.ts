import type {
  AdaptComponentApiShape,
  ButtonEventMap,
  ComponentEventValidators,
} from '@aurora/core';

type ButtonVueEvents = AdaptComponentApiShape<
  ButtonEventMap<MouseEvent>,
  { press: 'click'; actionFinished: 'debounceFinished'; actionError: 'debounceError' },
  never,
  { focus: [event: FocusEvent]; blur: [event: FocusEvent] }
>;

export const useButtonEmits = {
  /**
   * 鼠标点击后触发
   * @param e 点击事件
   * @paramEn e The e value.
   * @en Emitted when click changes.
   */
  click: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 聚焦后触发
   * @param e 聚集事件
   * @paramEn e The e value.
   * @en Emitted when focus changes.
   */
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  /**
   * 失焦后触发
   * @param e 失焦事件
   * @paramEn e The e value.
   * @en Emitted when blur changes.
   */
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  /**
   * 防抖函数执行完毕的通知
   * @en Emitted when debounce finished changes.
   */
  debounceFinished: () => true,
  /**
   * 防抖函数执行失败的通知
   * @param error 异步错误
   * @paramEn error The asynchronous error.
   * @en Emitted when the guarded action fails.
   */
  debounceError: (_error: unknown) => true,
} satisfies ComponentEventValidators<ButtonVueEvents>;

export type ButtonEmits = typeof useButtonEmits;
