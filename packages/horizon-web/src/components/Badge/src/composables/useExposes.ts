import type { ExtractExposeTypes } from '@aurora/shared';

export const useBadgeExposes = {};

export type BadgeExposes = ExtractExposeTypes<typeof useBadgeExposes>;
