import type { ExposeType, ExtractExposeTypes } from '@aurora/shared';
import type { ComputedRef } from 'vue';

export const useMenuExposes = {
  /**
   * 全部展开
   * @version 2.0.1
   */
  expandAll: Function as ExposeType<() => void>,
  /**
   * 全部收起
   * @version 2.0.1
   */
  collapseAll: Function as ExposeType<() => void>,
  /**
   * 展开传入的菜单
   * @param values `subMenu` 的唯一 `value`
   * @param replace 是否替换，默认 `true`
   * @version 2.0.1
   */
  expand: Function as ExposeType<(values: string[], replace: boolean) => void>,
  /**
   * 收起传入的菜单
   * @param values `subMenu` 的唯一 `value`
   * @version 2.0.7
   */
  collapse: Function as ExposeType<(values: string[]) => void>,
  /**
   * 滚动到激活的菜单处
   * 需要注意的是，如果菜单本身不可见（被折叠），可能无法滚动
   * @version 2.0.1
   */
  scrollToActive: Function as ExposeType<() => void>,
  /**
   * 展开的菜单列表
   * @version 2.10.0
   */
  expandMenus: Object as ExposeType<ComputedRef<string[]>>,
};

export type MenuExposes = ExtractExposeTypes<typeof useMenuExposes>;
