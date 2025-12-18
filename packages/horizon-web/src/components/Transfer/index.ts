import { default as Transfer } from './src/Transfer';
import { withInstall } from '@aurora/utils';

export const NTransfer = withInstall(Transfer);
export default NTransfer;

export type {
  TransferDataProps,
  useTransferProps,
  useTransferPanelProps,
} from './src/composables/useProps';
