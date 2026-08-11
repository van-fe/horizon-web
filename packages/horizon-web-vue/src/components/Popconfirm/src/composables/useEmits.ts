export const usePopconfirmEmits = {
  /** 可见状态变化 @en Emitted when visibility changes. @param value 是否显示 @paramEn value Whether visible. */
  'update:visible': (value: boolean) => typeof value === 'boolean',
  /** 点击确认 @en Emitted after confirmation. @param event 鼠标事件 @paramEn event Mouse event. */
  confirm: (event: MouseEvent) => event instanceof MouseEvent,
  /** 点击取消 @en Emitted after cancellation. @param event 鼠标事件 @paramEn event Mouse event. */
  cancel: (event: MouseEvent) => event instanceof MouseEvent,
};
export type PopconfirmEmits = typeof usePopconfirmEmits;
