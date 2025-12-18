import { default as Transfer } from './src/Transfer';
import { withInstall } from '@nio-fe/shared';

export const NTransfer = withInstall(Transfer);
export default NTransfer;

export type {
  TransferDataProps,
  useTransferProps,
  useTransferPanelProps,
} from './src/composables/useProps';
