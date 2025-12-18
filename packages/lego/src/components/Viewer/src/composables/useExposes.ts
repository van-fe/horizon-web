import type { ExtractExposeTypes } from '@nio-fe/shared';

export const useViewerExposes = {};

export type ViewerExposes = ExtractExposeTypes<typeof useViewerExposes>;
