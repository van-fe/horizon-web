import type { ExtractExposeTypes, ExposeType } from '@aurora/utils';

export const useCheckboxExposes = {
  /**
   * 切换checkbox的选中状态
    * @en Controls toggle.
   */
  toggle: Function as ExposeType<() => Promise<void>>,
};

export type CheckboxExposes = ExtractExposeTypes<typeof useCheckboxExposes>;
