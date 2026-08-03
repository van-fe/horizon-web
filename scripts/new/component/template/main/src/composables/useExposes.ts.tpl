import type { ExtractExposeTypes } from '@aurora/utils';

export const use${capitalName}Exposes = {};

export type ${capitalName}Exposes = ExtractExposeTypes<typeof use${capitalName}Exposes>;
