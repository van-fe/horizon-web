import type { ExtractExposeTypes } from '@aurora/shared';

export const use${capitalName}Exposes = {};

export type ${capitalName}Exposes = ExtractExposeTypes<typeof use${capitalName}Exposes>;
