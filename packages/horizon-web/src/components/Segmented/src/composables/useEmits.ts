import { isNumber, isString } from '@aurora/utils';
import type { HSegmentedValue } from './useProps';

export const useSegmentedEmits = {
  /**
   * 更新 activeKey
   * @param value 更新后的选项值
   * @paramEn value Updated option value.
   * @en Emitted when the active value changes.
   */
  'update:activeKey': (value: HSegmentedValue) => isString(value) || isNumber(value),

  /**
   * 选项卡变化回调
   * @param value 选中的选项值
   * @paramEn value Selected option value.
   * @en Emitted after the selected option changes.
   */
  change: (value: HSegmentedValue) => isString(value) || isNumber(value),
};

export const useSegmentedItemEmits = {
  /**
   * 点击选项时触发
   * @param value 当前选项值
   * @paramEn value Current option value.
   * @en Emitted when the option is clicked.
   */
  click: (value: HSegmentedValue) => isString(value) || isNumber(value),
};

export type SegmentedEmits = typeof useSegmentedEmits;

export type SegmentedItemEmits = typeof useSegmentedItemEmits;
