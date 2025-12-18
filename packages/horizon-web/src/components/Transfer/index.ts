import { default as Transfer } from './src/Transfer';
import { withInstall } from '@aurora/shared';

export const NTransfer = withInstall(Transfer);
export default NTransfer;

export type {
  TransferDataProps,
  useTransferProps,
  useTransferPanelProps,
} from './src/composables/useProps';
