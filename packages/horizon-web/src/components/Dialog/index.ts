import { default as Dialog } from './src/Dialog';
import { withInstall } from '@aurora/utils';
import type {
  DialogProps as HDialogProps,
  DialogSize as HDialogSize,
} from './src/composables/useProps';

export const HDialog = withInstall(Dialog);
export default HDialog;

export type { HDialogProps, HDialogSize };
