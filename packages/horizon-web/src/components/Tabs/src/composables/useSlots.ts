import type { SlotsType } from 'vue';
import type { HTabSize, HTabValue } from './useProps';

export const useTabsSlots = Object as SlotsType<{
  /**
   * 选项卡容器，使用 `n-tab` 填充
   **/
  default?: {};

  /**
   * 额外操作按钮
   * @version 2.0.16
   **/
  extra?: { size: HTabSize };
}>;

export type TabsSlots = typeof useTabsSlots;

export const useTabSlots = Object as SlotsType<{
  /**
   * 自定义选项卡，新增当前激活状态
   * @version 2.7.0
   */
  default?: { state: boolean; activeKey: HTabValue };

  /**
   * 自定义 icon
   * @version 2.0.16
   **/
  icon?: {};
}>;

export type TabSlots = typeof useTabSlots;
