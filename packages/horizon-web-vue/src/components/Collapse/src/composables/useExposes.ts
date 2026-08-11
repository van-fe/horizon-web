import type { CollapseCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useCollapseExposes = {
  /** 聚焦首个或指定面板标题。 @en Focuses the first or requested panel header. */
  focus: Function as ExposeType<CollapseCommandMap['focus']>,
};

export type CollapseExposes = ExtractExposeTypes<typeof useCollapseExposes>;
