import type { ExtractExposeTypes } from '@nio-fe/shared';

export const useContainerExposes = {};

export type ContainerExposes = ExtractExposeTypes<typeof useContainerExposes>;
