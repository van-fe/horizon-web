import { default as Empty } from './src/Empty';
import { withInstall } from '@nio-fe/shared';
import { PRESENTED_IMAGES } from './src/utils/presentedImages';

export const NEmpty = withInstall(Empty, { PRESENTED_IMAGES });
export default NEmpty;
