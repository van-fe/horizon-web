import { default as Tooltip } from './src/Tooltip';
import { withInstall } from '@aurora/utils';

export const NTooltip = withInstall(Tooltip);
export default NTooltip;

export type {
  TooltipProps as NTooltipProps,
  TooltipSize as NTooltipSize,
} from './src/composables/useProps';
