import type { ExtractExposeTypes } from '@nio-fe/shared';

export const useLinkExposes = {};

export type LinkExposes = ExtractExposeTypes<typeof useLinkExposes>;
