import type { ExtractExposeTypes, ExposeType } from '@nio-fe/shared';

export const useAutoCompleteExposes = {
  /**
   * 控制面板是否展示
   */
  changePanelVisible: Function as ExposeType<(visible: boolean) => void>,
};

export type AutoCompleteExposes = ExtractExposeTypes<typeof useAutoCompleteExposes>;
