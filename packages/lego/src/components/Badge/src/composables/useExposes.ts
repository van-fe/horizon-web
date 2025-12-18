import type { ExtractExposeTypes } from '@nio-fe/shared';

export const useBadgeExposes = {};

export type BadgeExposes = ExtractExposeTypes<typeof useBadgeExposes>;
