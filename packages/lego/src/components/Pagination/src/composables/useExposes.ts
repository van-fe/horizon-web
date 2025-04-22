import type { ExtractExposeTypes } from '@nio-fe/shared';

export const usePaginationExposes = {};

export type PaginationExposes = ExtractExposeTypes<typeof usePaginationExposes>;
