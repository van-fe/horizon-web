import type { ExtractExposeTypes } from '@aurora/shared';

export const useContainerExposes = {};

export type ContainerExposes = ExtractExposeTypes<typeof useContainerExposes>;
