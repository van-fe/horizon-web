export const useAudioPlayerEmits = {
  /**
   * 音频元数据加载完成时触发
   * @param audio 原生音频元素
   * @paramEn audio The native audio element.
   * @en Emitted when audio metadata is ready.
   */
  ready: (audio: HTMLAudioElement) => audio instanceof HTMLAudioElement,
  /**
   * 开始播放时触发
   * @param event 原生播放事件
   * @paramEn event The native play event.
   * @en Emitted when playback starts.
   */
  play: (event: Event) => event instanceof Event,
  /**
   * 暂停播放时触发
   * @param event 原生暂停事件
   * @paramEn event The native pause event.
   * @en Emitted when playback pauses.
   */
  pause: (event: Event) => event instanceof Event,
  /**
   * 播放结束时触发
   * @param event 原生结束事件
   * @paramEn event The native ended event.
   * @en Emitted when playback ends.
   */
  ended: (event: Event) => event instanceof Event,
  /**
   * 音频加载或播放失败时触发
   * @param event 原生错误事件
   * @paramEn event The native error event.
   * @en Emitted when the audio fails to load or play.
   */
  error: (event: Event) => event instanceof Event,
  /**
   * 播放时间变化时触发
   * @param currentTime 当前播放秒数
   * @param duration 总时长秒数
   * @paramEn currentTime The current playback time in seconds.
   * @paramEn duration The total duration in seconds.
   * @en Emitted when the playback time changes.
   */
  timeupdate: (currentTime: number, duration: number) =>
    Number.isFinite(currentTime) && Number.isFinite(duration),
  /**
   * 用户定位播放位置时触发
   * @param currentTime 定位后的播放秒数
   * @paramEn currentTime The new playback time in seconds.
   * @en Emitted after the user seeks.
   */
  seek: (currentTime: number) => Number.isFinite(currentTime),
  /**
   * 音量或静音状态变化时触发
   * @param volume 当前音量
   * @param muted 是否静音
   * @paramEn volume The current volume.
   * @paramEn muted Whether audio is muted.
   * @en Emitted when volume or mute state changes.
   */
  volumeChange: (volume: number, muted: boolean) =>
    volume >= 0 && volume <= 1 && typeof muted === 'boolean',
  /**
   * 播放倍速变化时触发
   * @param rate 当前播放倍速
   * @paramEn rate The current playback rate.
   * @en Emitted when the playback rate changes.
   */
  rateChange: (rate: number) => Number.isFinite(rate) && rate > 0,
  /**
   * 波形准备完成时触发
   * @param waveform 归一化后的波形
   * @param source 实际使用的波形来源
   * @paramEn waveform The normalized waveform values.
   * @paramEn source The waveform source that was actually used.
   * @en Emitted when waveform data is ready.
   */
  waveformReady: (waveform: number[], source: 'provided' | 'decoded' | 'mock') =>
    Array.isArray(waveform) && ['provided', 'decoded', 'mock'].includes(source),
};

export type AudioPlayerEmits = typeof useAudioPlayerEmits;
