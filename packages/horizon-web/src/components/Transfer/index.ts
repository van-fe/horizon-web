import { default as Transfer } from './src/Transfer';
import { withInstall } from '@aurora/utils';

export const HTransfer = withInstall(Transfer);
export default HTransfer;

export type {
  TransferDataProps,
  useTransferProps,
  useTransferPanelProps,
} from './src/composables/useProps';
