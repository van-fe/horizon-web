import type { ExtractExposeTypes } from '@nio-fe/shared';

export const useBreadcrumbExposes = {};

export type BreadcrumbExposes = ExtractExposeTypes<typeof useBreadcrumbExposes>;
