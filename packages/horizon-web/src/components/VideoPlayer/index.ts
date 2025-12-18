import { default as VideoPlayer } from './src/VideoPlayer';
import { withInstall } from '@aurora/utils';

export const NVideoPlayer = withInstall(VideoPlayer);
export default NVideoPlayer;
