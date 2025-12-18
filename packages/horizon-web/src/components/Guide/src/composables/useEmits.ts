import { isBoolean, isNumber } from '@aurora/utils';

export const useGuideEmits = {
  /**
   * 当前步骤变更时的通知
   * @param val 变更后的步骤
   */
  'update:modelValue': (val: number) => isNumber(val),
  /**
   * 当显隐变化时
   * @param val 变更后的步骤
   */
  'update:visible': (val: boolean) => isBoolean(val),
  /**
   * 中止指引时的通知
   */
  close: () => true,
  /**
   * 完成引导时的通知
   */
  finish: () => true,
};

export const useGuideItemEmits = {
  /**
   * 中止当前指引时的通知
   */
  close: () => true,
  /**
   * 完成当前引导时的通知
   */
  finish: () => true,
};

export type GuideEmits = typeof useGuideEmits;
export type GuideItemEmits = typeof useGuideItemEmits;
