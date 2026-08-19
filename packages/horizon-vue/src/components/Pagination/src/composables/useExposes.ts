import type { PaginationCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const usePaginationExposes = {
  /** 聚焦首个或指定页码的分页操作。 @en Focuses the first or requested page action. */
  focus: Function as ExposeType<PaginationCommandMap['focus']>,
};

export type PaginationExposes = ExtractExposeTypes<typeof usePaginationExposes>;
