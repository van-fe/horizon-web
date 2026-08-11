import type { ExtractExposeTypes, ExposeType } from '@aurora/utils';
import type { CheckboxCommandMap } from '@aurora/core';

export const useCheckboxExposes = {
  /**
   * 切换checkbox的选中状态
   * @en Controls toggle.
   */
  toggle: Function as ExposeType<CheckboxCommandMap['toggle']>,
};

export type CheckboxExposes = ExtractExposeTypes<typeof useCheckboxExposes>;
