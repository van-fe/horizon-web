import type { ExtractMethodOptions } from '@aurora/utils';
import { declarePropType } from '@aurora/utils';

export const use${capitalName}Options = declarePropType({});

export type ${capitalName}Options = ExtractMethodOptions<typeof use${capitalName}Options>;
