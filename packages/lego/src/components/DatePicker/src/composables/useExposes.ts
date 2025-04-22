import type { ExposeType, ExtractExposeTypes } from '@nio-fe/shared';

export const useDatePickerExposes = {
  /**
   * 控制面板是否展示
   * @version 2.8.2
   */
  changePanelVisible: Function as ExposeType<(visible: boolean) => void>,
  /**
   * 隐藏
   * @deprecated 请改用 `changePanelVisible`
   */
  onHide: Function as ExposeType<() => void>,
  /**
   * 增加/减少年
   * @param diff 年数
   */
  changeYear: Function as ExposeType<(diff: number) => void>,
  /**
   * 增加/减少月
   * @param diff 月数
   */
  changeMonth: Function as ExposeType<(diff: number) => void>,
};

export type DatePickerExposes = ExtractExposeTypes<typeof useDatePickerExposes>;
