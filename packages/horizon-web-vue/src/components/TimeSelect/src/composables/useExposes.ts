import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useTimeSelectExposes = {
  /**
   * 聚焦输入框
   * @en Focuses the input.
   */
  focus: Function as ExposeType<() => void>,
  /**
   * 使输入框失焦
   * @en Blurs the input.
   */
  blur: Function as ExposeType<() => void>,
  /**
   * 清空当前值
   * @en Clears the current value.
   */
  clear: Function as ExposeType<() => void>,
  /**
   * 控制下拉面板显隐
   * @param visible 是否显示
   * @paramEn visible Whether the dropdown is visible.
   * @en Controls dropdown visibility.
   */
  changePanelVisible: Function as ExposeType<(visible: boolean) => void>,
};

export type TimeSelectExposes = ExtractExposeTypes<typeof useTimeSelectExposes>;
