import { isString, isNumber, isUndefined } from '@aurora/utils';

export const useCollapseEmits = {
  /**
   * 改变当前激活的面板
   * @param activeKeys 页面大小
   * @paramEn activeKeys The active keys value.
    * @en Emitted when change changes.
   */
  change: (activeKeys?: string | number | (string | number)[]) =>
    isString(activeKeys) ||
    isNumber(activeKeys) ||
    Array.isArray(activeKeys) ||
    isUndefined(activeKeys),
  /**
   * 改变当前激活的面板
   * @param activeKeys
    * @en Emitted when update:active key changes.
   */
  'update:activeKey': (activeKeys?: string | number | (string | number)[]) =>
    isString(activeKeys) ||
    isNumber(activeKeys) ||
    Array.isArray(activeKeys) ||
    isUndefined(activeKeys),
};

export type CollapseEmits = typeof useCollapseEmits;
