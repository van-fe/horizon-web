import type { DirectiveOptionType, ExtractDirectiveOptionTypes } from '@nio-fe/shared';
import { declareDirectiveOptionType } from '@nio-fe/shared';

export const use${capitalName}Options = declareDirectiveOptionType({
});

export type ${capitalName}Options = ExtractDirectiveOptionTypes<typeof use${capitalName}Options>;
