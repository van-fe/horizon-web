import type { ExtractExposeTypes, ExposeType } from '@aurora/utils';

export const useAutoCompleteExposes = {
  /**
   * 控制面板是否展示
    * @en Controls change panel visible.
   */
  changePanelVisible: Function as ExposeType<(visible: boolean) => void>,
};

export type AutoCompleteExposes = ExtractExposeTypes<typeof useAutoCompleteExposes>;
