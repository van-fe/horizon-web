import type { ExtractMethodOptions } from '@aurora/shared';
import { declarePropType } from '@aurora/shared';

export const use${capitalName}Options = declarePropType({});

export type ${capitalName}Options = ExtractMethodOptions<typeof use${capitalName}Options>;
