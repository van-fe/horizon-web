import { isBoolean, isNumber } from '@aurora/utils';

export const useGuideEmits = {
  /**
   * 当前步骤变更时的通知
   * @param val 变更后的步骤
   * @paramEn val The val value.
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (val: number) => isNumber(val),
  /**
   * 当显隐变化时
   * @param val 变更后的步骤
   * @paramEn val The val value.
    * @en Emitted when update:visible changes.
   */
  'update:visible': (val: boolean) => isBoolean(val),
  /**
   * 中止指引时的通知
    * @en Emitted when close changes.
   */
  close: () => true,
  /**
   * 完成引导时的通知
    * @en Emitted when finish changes.
   */
  finish: () => true,
};

export const useGuideItemEmits = {
  /**
   * 中止当前指引时的通知
    * @en Emitted when close changes.
   */
  close: () => true,
  /**
   * 完成当前引导时的通知
    * @en Emitted when finish changes.
   */
  finish: () => true,
};

export type GuideEmits = typeof useGuideEmits;
export type GuideItemEmits = typeof useGuideItemEmits;
