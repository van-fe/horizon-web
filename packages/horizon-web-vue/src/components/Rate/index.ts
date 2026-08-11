import { default as Rate } from './src/Rate';
import { withInstall } from '@aurora/utils';

export const HRate = withInstall(Rate);
export default HRate;
export type { RateProps, RatePresetSize, RateSize, RateTooltip } from './src/composables/useProps';
export type { RateExposes } from './src/composables/useExposes';
