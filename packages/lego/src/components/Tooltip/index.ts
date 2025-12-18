import { default as Tooltip } from './src/Tooltip';
import { withInstall } from '@nio-fe/shared';

export const NTooltip = withInstall(Tooltip);
export default NTooltip;

export type {
  TooltipProps as NTooltipProps,
  TooltipSize as NTooltipSize,
} from './src/composables/useProps';
