import type { DirectiveOptionType, ExtractDirectiveOptionTypes } from '@aurora/utils';
import { declareDirectiveOptionType } from '@aurora/utils';

export const use${capitalName}Options = declareDirectiveOptionType({
});

export type ${capitalName}Options = ExtractDirectiveOptionTypes<typeof use${capitalName}Options>;
