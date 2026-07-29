import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { ComputedRef } from 'vue';

export const useMenuExposes = {
  /**
   * 全部展开
    * @en Controls expand all.
   */
  expandAll: Function as ExposeType<() => void>,
  /**
   * 全部收起
    * @en Controls collapse all.
   */
  collapseAll: Function as ExposeType<() => void>,
  /**
   * 展开传入的菜单
   * @param values `subMenu` 的唯一 `value`
   * @paramEn values The values value.
   * @param replace 是否替换，默认 `true`
   * @paramEn replace The replace value.
    * @en Controls expand.
   */
  expand: Function as ExposeType<(values: string[], replace: boolean) => void>,
  /**
   * 收起传入的菜单
   * @param values `subMenu` 的唯一 `value`
   * @paramEn values The values value.
    * @en Controls collapse.
   */
  collapse: Function as ExposeType<(values: string[]) => void>,
  /**
   * 滚动到激活的菜单处
   * 需要注意的是，如果菜单本身不可见（被折叠），可能无法滚动
    * @en Controls scroll to active.
   */
  scrollToActive: Function as ExposeType<() => void>,
  /**
   * 展开的菜单列表
    * @en Controls expand menus.
   */
  expandMenus: Object as ExposeType<ComputedRef<string[]>>,
};

export type MenuExposes = ExtractExposeTypes<typeof useMenuExposes>;
