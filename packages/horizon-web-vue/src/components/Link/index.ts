import { default as Link } from './src/Link';
import { withInstall } from '@aurora/utils';

export const HLink = withInstall(Link);
export default HLink;
export type { LinkEmits } from './src/composables/useEmits';
export type { LinkExposes } from './src/composables/useExposes';
export type { LinkProps } from './src/composables/useProps';
export type { LinkSlots } from './src/composables/useSlots';
