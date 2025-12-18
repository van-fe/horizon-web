import type { VideoJsPlayer } from 'video.js';
import { isObject } from '@nio-fe/shared';

export const useVideoPlayerEmits = {
  /**
   * 视频播放器加载完成时的回调
   * @param playerInstance videoJs 实例
   */
  ready: (playerInstance: VideoJsPlayer) => isObject(playerInstance),
};

export type VideoPlayerEmits = typeof useVideoPlayerEmits;
