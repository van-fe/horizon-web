import { default as Empty } from './src/Empty';
import { withInstall } from '@aurora/utils';
import { PRESENTED_IMAGES } from './src/utils/presentedImages';

export const NEmpty = withInstall(Empty, { PRESENTED_IMAGES });
export default NEmpty;
