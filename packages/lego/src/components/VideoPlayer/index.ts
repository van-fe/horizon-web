import { default as VideoPlayer } from './src/VideoPlayer';
import { withInstall } from '@nio-fe/shared';

export const NVideoPlayer = withInstall(VideoPlayer);
export default NVideoPlayer;
