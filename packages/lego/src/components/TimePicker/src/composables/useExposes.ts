import type { ExposeType, ExtractExposeTypes } from '@nio-fe/shared';

export const useTimePickerExposes = {
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
   * 内部 `input` 元素
   */
  timePicker: Object as ExposeType<HTMLInputElement>,
};

export type TimePickerExposes = ExtractExposeTypes<typeof useTimePickerExposes>;
