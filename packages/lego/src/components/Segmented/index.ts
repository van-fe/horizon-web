import { default as Segmented } from './src/Segmented';
import { default as SegmentedItem } from './src/SegmentedItem';
import { withInstall, withNoopInstall } from '@nio-fe/shared';

export type {
  NSegmentedSize,
  NSegmentedValue,
  SegmentedProps,
  SegmentedItemProps,
} from './src/composables/useProps';

export const NSegmented = withInstall(Segmented, { SegmentedItem });
export const NSegmentedItem = withNoopInstall(SegmentedItem);
export default NSegmented;
