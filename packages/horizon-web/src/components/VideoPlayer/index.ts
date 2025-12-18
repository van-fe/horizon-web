import { default as VideoPlayer } from './src/VideoPlayer';
import { withInstall } from '@aurora/shared';

export const NVideoPlayer = withInstall(VideoPlayer);
export default NVideoPlayer;
