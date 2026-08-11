import { withInstall } from '@aurora/utils';
import Typography from './src/Typography';

export const HTypography = withInstall(Typography);
export default HTypography;

export type { TypographyProps as HTypographyProps } from './src/composables/useProps';
export type { TypographyEmits as HTypographyEmits } from './src/composables/useEmits';
export type { TypographySlots as HTypographySlots } from './src/composables/useSlots';
export type { TypographyExposes as HTypographyExposes } from './src/composables/useExposes';
