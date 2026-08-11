import { default as Segmented } from './src/Segmented';
import { default as SegmentedItem } from './src/SegmentedItem';
import { withInstall, withNoopInstall } from '@aurora/utils';

export type {
  HSegmentedSize,
  HSegmentedValue,
  SegmentedProps,
  SegmentedItemProps,
} from './src/composables/useProps';

export const HSegmented = withInstall(Segmented, { SegmentedItem });
export const HSegmentedItem = withNoopInstall(SegmentedItem);
export default HSegmented;
