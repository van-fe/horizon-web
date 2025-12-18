import type { ExtractExposeTypes } from '@aurora/shared';

export const useBreadcrumbExposes = {};

export type BreadcrumbExposes = ExtractExposeTypes<typeof useBreadcrumbExposes>;
