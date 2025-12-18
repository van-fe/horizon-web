import type { DirectiveOptionType, ExtractDirectiveOptionTypes } from '@aurora/shared';
import { declareDirectiveOptionType } from '@aurora/shared';

export const use${capitalName}Options = declareDirectiveOptionType({
});

export type ${capitalName}Options = ExtractDirectiveOptionTypes<typeof use${capitalName}Options>;
