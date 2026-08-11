import type { Source } from './useProps';

export const useVideoPlayerEmits = {
  /**
   * 视频播放器加载完成时的回调
   * @param playerInstance HTMLVideoElement 实例
   * @paramEn playerInstance The player instance value.
   * @en Emitted when the native video metadata is ready.
   */
  ready: (playerInstance: HTMLVideoElement) => playerInstance instanceof HTMLVideoElement,
  /**
   * 开始播放时触发
   * @param event 原生播放事件
   * @paramEn event Native play event.
   * @en Emitted when playback starts.
   */
  play: (event: Event) => event instanceof Event,
  /**
   * 暂停播放时触发
   * @param event 原生暂停事件
   * @paramEn event Native pause event.
   * @en Emitted when playback pauses.
   */
  pause: (event: Event) => event instanceof Event,
  /**
   * 播放结束时触发
   * @param event 原生结束事件
   * @paramEn event Native ended event.
   * @en Emitted when playback ends.
   */
  ended: (event: Event) => event instanceof Event,
  /**
   * 视频加载或播放失败时触发
   * @param event 原生错误事件
   * @paramEn event Native error event.
   * @en Emitted when the video fails to load or play.
   */
  error: (event: Event) => event instanceof Event,
  /**
   * 播放时间变化时触发
   * @param currentTime 当前播放秒数
   * @param duration 视频总时长秒数
   * @paramEn currentTime Current playback time in seconds.
   * @paramEn duration Total duration in seconds.
   * @en Emitted when the playback time changes.
   */
  timeupdate: (currentTime: number, duration: number) =>
    Number.isFinite(currentTime) && Number.isFinite(duration),
  /**
   * 用户调整播放位置时触发
   * @param currentTime 调整后的播放秒数
   * @paramEn currentTime New playback time in seconds.
   * @en Emitted after the user seeks.
   */
  seek: (currentTime: number) => Number.isFinite(currentTime),
  /**
   * 音量或静音状态变化时触发
   * @param volume 当前音量
   * @param muted 是否静音
   * @paramEn volume Current volume between 0 and 1.
   * @paramEn muted Whether the video is muted.
   * @en Emitted when volume or mute state changes.
   */
  volumeChange: (volume: number, muted: boolean) =>
    volume >= 0 && volume <= 1 && typeof muted === 'boolean',
  /**
   * 播放倍速变化时触发
   * @param rate 当前播放倍速
   * @paramEn rate Current playback rate.
   * @en Emitted when the playback rate changes.
   */
  rateChange: (rate: number) => Number.isFinite(rate) && rate > 0,
  /**
   * 视频源变化时触发
   * @param source 当前视频源
   * @param index 当前视频源索引
   * @paramEn source Selected video source.
   * @paramEn index Selected source index.
   * @en Emitted when the selected video source changes.
   */
  sourceChange: (source: Source, index: number) =>
    typeof source?.src === 'string' && Number.isInteger(index) && index >= 0,
  /**
   * 全屏状态变化时触发
   * @param fullscreen 是否处于全屏状态
   * @paramEn fullscreen Whether the player is fullscreen.
   * @en Emitted when fullscreen state changes.
   */
  fullscreenChange: (fullscreen: boolean) => typeof fullscreen === 'boolean',
};

export type VideoPlayerEmits = typeof useVideoPlayerEmits;
