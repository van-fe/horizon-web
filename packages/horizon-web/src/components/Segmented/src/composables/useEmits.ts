import { isNumber, isString } from '@aurora/utils';
import type { HSegmentedValue } from './useProps';

export const useSegmentedEmits = {
  /**
   * 更新 activeKey
   **/
  'update:activeKey': (key: HSegmentedValue) => isString(key) || isNumber(key),

  /**
   * 选项卡变化回调
   **/
  change: (key: HSegmentedValue) => isString(key) || isNumber(key),
};

export const useSegmentedItemEmits = {
  /**
   * 点击触发点击事件
   **/
  click: (key: HSegmentedValue) => isString(key) || isNumber(key),
};

export type SegmentedEmits = typeof useSegmentedEmits;

export type SegmentedItemEmits = typeof useSegmentedItemEmits;
