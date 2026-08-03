import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useVideoPlayerExposes = {
  /**
   * 原生 video 元素
   * @en Native HTMLVideoElement.
   */
  video: Object as ExposeType<HTMLVideoElement>,
  /**
   * 开始播放
   * @en Starts playback.
   */
  play: Function as ExposeType<() => Promise<void>>,
  /**
   * 暂停播放
   * @en Pauses playback.
   */
  pause: Function as ExposeType<() => void>,
  /**
   * 跳转到指定秒数
   * @param time 目标秒数
   * @paramEn time Target time in seconds.
   * @en Seeks to a time in seconds.
   */
  seek: Function as ExposeType<(time: number) => void>,
  /**
   * 切换全屏状态
   * @en Toggles fullscreen mode.
   */
  requestFullscreen: Function as ExposeType<() => Promise<void>>,
};

export type VideoPlayerExposes = ExtractExposeTypes<typeof useVideoPlayerExposes>;
