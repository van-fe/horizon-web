import { isNumber, isString } from '@aurora/shared';
import type { NTabValue } from './useProps';
import isUndefined from 'lodash/isUndefined';

export const useTabsEmits = {
  /**
   * 更新 `modelValue`
   * @deprecated `update:activeKey`
   */
  'update:modelValue': (key: NTabValue) => isString(key) || isNumber(key),

  /**
   * 更新选项卡 activeKey
   * @version 2.0.16
   **/
  'update:activeKey': (key: NTabValue) => isString(key) || isNumber(key),

  /**
   * 选项卡变化回调
   **/
  change: (key: NTabValue) => isString(key) || isNumber(key),

  /**
   * 点击新增按钮的回调
   **/
  add: () => true,

  /**
   * 点击关闭按钮的回调
   **/
  close: (key: NTabValue) => isString(key) || isNumber(key) || isUndefined(key),

  /**
   * 失焦时触发（请不要使用，请使用 change 替代完成和其他表单交互，下个版本移除）
   * @param evt 失焦事件
   * @deprecated
   **/
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,

  /**
   * 选项卡拖拽排序
   * @param {number} current 当前拖拽的索引
   * @param {number} target 目标索引
   * @param keys 排序后的 key 数组
   * @version 2.0.16
   **/
  sort: (current: number, target: number, keys: NTabValue[]) =>
    isNumber(current) && isNumber(target) && Array.isArray(keys),
};

export const useTabEmits = {
  /**
   * 点击页签触发点击事件
   * @version 2.0.16
   **/
  click: (key: NTabValue) => isString(key) || isNumber(key),
  /**
   * 点击页签上的关闭按钮
   * @version 2.0.16
   **/
  close: (key: NTabValue) => isString(key) || isNumber(key),
};

export type TabsEmits = typeof useTabsEmits;

export type TabEmits = typeof useTabEmits;
