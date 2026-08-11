import { default as Tooltip } from './src/Tooltip';
import { withInstall } from '@aurora/utils';

export const HTooltip = withInstall(Tooltip);
export default HTooltip;

export type {
  TooltipProps as HTooltipProps,
  TooltipSize as HTooltipSize,
} from './src/composables/useProps';
