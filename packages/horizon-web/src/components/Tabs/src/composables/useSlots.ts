import type { SlotsType } from 'vue';
import type { HTabSize, HTabValue } from './useProps';

export const useTabsSlots = Object as SlotsType<{
  /**
   * 选项卡容器，使用 `h-tab` 填充
    * @en Custom content for the default slot.
   **/
  default?: {};

  /**
   * 额外操作按钮
    * @en Custom content for the extra slot.
   **/
  extra?: { size: HTabSize };
}>;

export type TabsSlots = typeof useTabsSlots;

export const useTabSlots = Object as SlotsType<{
  /**
   * 自定义选项卡，新增当前激活状态
    * @en Custom content for the default slot.
   */
  default?: { state: boolean; activeKey: HTabValue };

  /**
   * 自定义 icon
    * @en Custom content for the icon slot.
   **/
  icon?: {};
}>;

export type TabSlots = typeof useTabSlots;
