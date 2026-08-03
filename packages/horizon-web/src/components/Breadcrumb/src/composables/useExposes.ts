import type { ExtractExposeTypes } from '@aurora/utils';

export const useBreadcrumbExposes = {};

export type BreadcrumbExposes = ExtractExposeTypes<typeof useBreadcrumbExposes>;
