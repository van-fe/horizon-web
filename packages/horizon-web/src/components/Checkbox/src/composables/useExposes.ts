import type { ExtractExposeTypes, ExposeType } from '@aurora/utils';

export const useCheckboxExposes = {
  /**
   * 切换checkbox的选中状态
   * @version 2.9.0
   */
  toggle: Function as ExposeType<() => Promise<void>>,
};

export type CheckboxExposes = ExtractExposeTypes<typeof useCheckboxExposes>;
