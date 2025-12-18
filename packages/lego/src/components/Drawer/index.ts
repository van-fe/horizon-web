import { default as Drawer } from './src/Drawer';
import { withInstall } from '@nio-fe/shared';
import type {
  DrawerSize as NDrawerSize,
  DrawerPlacement as NDrawerPlacement,
  DrawerProps as NDrawerProps,
} from './src/composables/useProps';

export const NDrawer = withInstall(Drawer);
export default NDrawer;

export type { NDrawerSize, NDrawerPlacement, NDrawerProps };
