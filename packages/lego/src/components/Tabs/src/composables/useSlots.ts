import type { NTabSize, NTabValue } from './useProps';

export const useTabsSlots = {
  /**
   * 选项卡容器，使用 `n-tab` 填充
   **/
  default: () => true,

  /**
   * 额外操作按钮
   * @version 2.0.16
   **/
  extra: ({ size }: { size: NTabSize }) => true,
};

export type TabsSlots = typeof useTabsSlots;

export const useTabSlots = {
  /**
   * 自定义选项卡，新增当前激活状态
   * @version 2.7.0
   */
  default: ({ state, activeKey }: { state: boolean; activeKey: NTabValue }) => true,

  /**
   * 自定义 icon
   * @version 2.0.16
   **/
  icon: () => true,
};

export type TabSlots = typeof useTabSlots;
