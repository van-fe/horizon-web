import { isString, isNumber, isUndefined } from '@aurora/utils';

export const useCollapseEmits = {
  /**
   * 改变当前激活的面板
   * @param activeKeys 页面大小
   */
  change: (activeKeys?: string | number | (string | number)[]) =>
    isString(activeKeys) ||
    isNumber(activeKeys) ||
    Array.isArray(activeKeys) ||
    isUndefined(activeKeys),
  /**
   * 改变当前激活的面板
   * @param activeKeys
   * @version 2.0.1
   */
  'update:activeKey': (activeKeys?: string | number | (string | number)[]) =>
    isString(activeKeys) ||
    isNumber(activeKeys) ||
    Array.isArray(activeKeys) ||
    isUndefined(activeKeys),
};

export type CollapseEmits = typeof useCollapseEmits;
