import { default as TransferV2 } from './src/TransferV2';
import { withInstall } from '@nio-fe/shared';

export const NTransferV2 = withInstall(TransferV2);
export default NTransferV2;

export type {
  TransferDataProps,
  useTransferV2Props,
  useTransferV2PanelProps,
} from './src/composables/useProps';
