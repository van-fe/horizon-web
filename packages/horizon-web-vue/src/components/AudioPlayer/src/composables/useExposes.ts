import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useAudioPlayerExposes = {
  /**
   * 原生音频元素
   * @en The native audio element.
   */
  audio: Object as ExposeType<HTMLAudioElement>,
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
   * 跳转至指定秒数
   * @param time 目标秒数
   * @paramEn time The target time in seconds.
   * @en Seeks to a time in seconds.
   */
  seek: Function as ExposeType<(time: number) => void>,
};

export type AudioPlayerExposes = ExtractExposeTypes<typeof useAudioPlayerExposes>;
