import type { ExtractExposeTypes } from '@aurora/utils';

export const useBadgeExposes = {};

export type BadgeExposes = ExtractExposeTypes<typeof useBadgeExposes>;
