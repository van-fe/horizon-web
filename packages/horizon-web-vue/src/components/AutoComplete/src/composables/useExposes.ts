import type { AutoCompleteCommandMap } from '@aurora/core';
import type { ExtractExposeTypes, ExposeType } from '@aurora/utils';

export const useAutoCompleteExposes = {
  /** 控制面板显隐。 @en Changes popup visibility. */
  changePanelVisible: Function as ExposeType<(visible: boolean) => void>,
  /** 聚焦输入框。 @en Focuses the input. */
  focus: Function as ExposeType<AutoCompleteCommandMap['focus']>,
  /** 使输入框失焦。 @en Blurs the input. */
  blur: Function as ExposeType<AutoCompleteCommandMap['blur']>,
  /** 打开面板。 @en Opens the popup. */
  open: Function as ExposeType<AutoCompleteCommandMap['open']>,
  /** 关闭面板。 @en Closes the popup. */
  close: Function as ExposeType<AutoCompleteCommandMap['close']>,
  /** 清空输入值。 @en Clears the input value. */
  clear: Function as ExposeType<AutoCompleteCommandMap['clear']>,
};

export type AutoCompleteExposes = ExtractExposeTypes<typeof useAutoCompleteExposes>;
