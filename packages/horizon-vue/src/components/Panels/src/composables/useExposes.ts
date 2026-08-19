import type { PanelsCommandMap } from '@aurora/core';
import type { ExtractExposeTypes } from '@aurora/utils';

export const usePanelsExposes = {} satisfies PanelsCommandMap;

export type PanelsExposes = ExtractExposeTypes<typeof usePanelsExposes>;
