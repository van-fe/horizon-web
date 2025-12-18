import type { ExtractPropTypes } from 'vue';
import { declarePropType } from '@aurora/shared';

export const use${capitalName}Props = declarePropType({});

export type ${capitalName}Props = ExtractPropTypes<typeof use${capitalName}Props>;
