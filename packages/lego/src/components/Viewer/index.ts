import { default as Viewer } from './src/Viewer';
import type {
  NViewerSource,
  NViewerCustomToolItem,
  NViewerLegend,
} from './src/composables/useProps';
import { withInstall } from '@nio-fe/shared';

export const NViewer = withInstall(Viewer);
export default NViewer;

export type { NViewerSource, NViewerCustomToolItem, NViewerLegend };
