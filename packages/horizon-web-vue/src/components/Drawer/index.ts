import { default as Drawer } from './src/Drawer';
import { withInstall } from '@aurora/utils';
import type {
  DrawerSize as HDrawerSize,
  DrawerPlacement as HDrawerPlacement,
  DrawerProps as HDrawerProps,
} from './src/composables/useProps';

export const HDrawer = withInstall(Drawer);
export default HDrawer;

export type { HDrawerSize, HDrawerPlacement, HDrawerProps };
