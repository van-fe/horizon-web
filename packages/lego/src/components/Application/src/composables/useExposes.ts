import type { ExtractExposeTypes } from '@nio-fe/shared';

export const useApplicationExposes = {};

export type ApplicationExposes = ExtractExposeTypes<typeof useApplicationExposes>;
