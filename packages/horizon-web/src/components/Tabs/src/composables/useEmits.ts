import { isNumber, isString } from '@aurora/utils';
import type { HTabValue } from './useProps';
import isUndefined from 'lodash/isUndefined';

export const useTabsEmits = {
  /**
   * 更新选项卡 activeKey
   * @en Emitted when update:active key changes.
   **/
  'update:activeKey': (key: HTabValue) => isString(key) || isNumber(key),

  /**
   * 选项卡变化回调
   * @en Emitted when change changes.
   **/
  change: (key: HTabValue) => isString(key) || isNumber(key),

  /**
   * 点击新增按钮的回调
   * @en Emitted when add changes.
   **/
  add: () => true,

  /**
   * 点击关闭按钮的回调
   * @en Emitted when close changes.
   **/
  close: (key: HTabValue) => isString(key) || isNumber(key) || isUndefined(key),

  /**
   * 选项卡拖拽排序
   * @param {number} current 当前拖拽的索引
   * @param {number} target 目标索引
   * @param keys 排序后的 key 数组
   * @paramEn keys The keys value.
   * @en Emitted when sort changes.
   **/
  sort: (current: number, target: number, keys: HTabValue[]) =>
    isNumber(current) && isNumber(target) && Array.isArray(keys),
};

export const useTabEmits = {
  /**
   * 点击页签触发点击事件
   * @en Emitted when click changes.
   **/
  click: (key: HTabValue) => isString(key) || isNumber(key),
  /**
   * 点击页签上的关闭按钮
   * @en Emitted when close changes.
   **/
  close: (key: HTabValue) => isString(key) || isNumber(key),
};

export type TabsEmits = typeof useTabsEmits;

export type TabEmits = typeof useTabEmits;
