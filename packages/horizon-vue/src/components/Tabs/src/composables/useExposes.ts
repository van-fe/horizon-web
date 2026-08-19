import type { TabsCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useTabsExposes = {
  /** 聚焦首个或指定条目。 @en Focuses the first or requested tab. */
  focus: Function as ExposeType<TabsCommandMap['focus']>,
};
export type TabsExposes = ExtractExposeTypes<typeof useTabsExposes>;
