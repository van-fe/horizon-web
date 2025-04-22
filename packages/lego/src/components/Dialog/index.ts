import { default as Dialog } from './src/Dialog';
import { withInstall } from '@nio-fe/shared';
import type {
  DialogProps as NDialogProps,
  DialogSize as NDialogSize,
} from './src/composables/useProps';

export const NDialog = withInstall(Dialog);
export default NDialog;

export type { NDialogProps, NDialogSize };
