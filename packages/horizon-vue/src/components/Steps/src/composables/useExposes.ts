import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { StepsCommandMap } from '@aurora/core';

export const useStepsExposes = {
  /** 聚焦首个或指定索引的可交互步骤。 @en Focuses the first or indexed interactive step. */
  focus: Function as ExposeType<StepsCommandMap['focus']>,
};

export type StepsExposes = ExtractExposeTypes<typeof useStepsExposes>;
