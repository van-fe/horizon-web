import type { SlotsType } from 'vue';

export const useAudioPlayerSlots = Object as SlotsType<{
  /**
   * 播放按钮前的自定义内容
   * @en Custom content before the play button.
   */
  prefix?: () => unknown;
  /**
   * 倍速选择器后的自定义内容
   * @en Custom content after the playback-rate selector.
   */
  suffix?: () => unknown;
}>;

export type AudioPlayerSlots = typeof useAudioPlayerSlots;
