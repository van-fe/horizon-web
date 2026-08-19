import type { ExtractExposeTypes } from '@aurora/utils';
import type { BreadcrumbCommandMap } from '@aurora/core';

export const useBreadcrumbExposes = {} satisfies BreadcrumbCommandMap;

export type BreadcrumbExposes = ExtractExposeTypes<typeof useBreadcrumbExposes>;
