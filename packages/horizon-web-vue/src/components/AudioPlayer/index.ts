import { default as AudioPlayer } from './src/AudioPlayer';
import { withInstall } from '@aurora/utils';

export const HAudioPlayer = withInstall(AudioPlayer);
export default HAudioPlayer;
