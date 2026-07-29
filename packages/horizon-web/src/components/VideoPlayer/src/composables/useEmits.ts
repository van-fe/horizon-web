import { isObject } from '@aurora/utils';

export const useVideoPlayerEmits = {
  /**
   * 视频播放器加载完成时的回调
   * @param playerInstance HTMLVideoElement 实例
   * @paramEn playerInstance The player instance value.
    * @en Emitted when ready changes.
   */
  ready: (playerInstance: HTMLVideoElement) => isObject(playerInstance),
};

export type VideoPlayerEmits = typeof useVideoPlayerEmits;
