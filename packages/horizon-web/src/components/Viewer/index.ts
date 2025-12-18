import { default as Viewer } from './src/Viewer';
import type {
  NViewerSource,
  NViewerCustomToolItem,
  NViewerLegend,
} from './src/composables/useProps';
import { withInstall } from '@aurora/utils';

export const NViewer = withInstall(Viewer);
export default NViewer;

export type { NViewerSource, NViewerCustomToolItem, NViewerLegend };
