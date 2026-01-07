import { isObject } from '@aurora/utils';

export const useVideoPlayerEmits = {
  /**
   * 视频播放器加载完成时的回调
   * @param playerInstance HTMLVideoElement 实例
   */
  ready: (playerInstance: HTMLVideoElement) => isObject(playerInstance),
};

export type VideoPlayerEmits = typeof useVideoPlayerEmits;
