import type { ExtractExposeTypes } from '@aurora/utils';

export const useContainerExposes = {};

export type ContainerExposes = ExtractExposeTypes<typeof useContainerExposes>;
