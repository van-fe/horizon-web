import type { ExtractMethodOptions } from '@nio-fe/shared';
import { declarePropType } from '@nio-fe/shared';

export const use${capitalName}Options = declarePropType({});

export type ${capitalName}Options = ExtractMethodOptions<typeof use${capitalName}Options>;
