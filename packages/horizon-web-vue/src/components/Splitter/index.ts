import { withInstall, withNoopInstall } from '@aurora/utils';
import Splitter from './src/Splitter';
import SplitterPanel from './src/SplitterPanel';

export const HSplitter = withInstall(Splitter, { SplitterPanel });
export const HSplitterPanel = withNoopInstall(SplitterPanel);
export default HSplitter;

export type { SplitterProps as HSplitterProps } from './src/composables/useProps';
export type { SplitterEmits as HSplitterEmits } from './src/composables/useEmits';
export type { SplitterSlots as HSplitterSlots } from './src/composables/useSlots';
export type { SplitterExposes as HSplitterExposes } from './src/composables/useExposes';
