import { default as Viewer } from './src/Viewer';
import type {
  HViewerSource,
  HViewerCustomToolItem,
  HViewerLegend,
} from './src/composables/useProps';
import { withInstall } from '@aurora/utils';

export const HViewer = withInstall(Viewer);
export default HViewer;

export type { HViewerSource, HViewerCustomToolItem, HViewerLegend };
