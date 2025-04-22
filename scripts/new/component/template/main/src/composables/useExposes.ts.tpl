import type { ExtractExposeTypes } from '@nio-fe/shared';

export const use${capitalName}Exposes = {};

export type ${capitalName}Exposes = ExtractExposeTypes<typeof use${capitalName}Exposes>;
