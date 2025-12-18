import type { ExtractExposeTypes, ExposeType } from '@aurora/shared';

export const useAutoCompleteExposes = {
  /**
   * 控制面板是否展示
   */
  changePanelVisible: Function as ExposeType<(visible: boolean) => void>,
};

export type AutoCompleteExposes = ExtractExposeTypes<typeof useAutoCompleteExposes>;
