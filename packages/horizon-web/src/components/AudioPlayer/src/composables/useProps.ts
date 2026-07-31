import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export type AudioWaveformSource = 'auto' | 'mock' | 'none';

export const useAudioPlayerProps = declarePropType({
  /**
   * 音频资源地址
   * @en Audio resource URL.
   */
  src: { type: String, required: true },
  /**
   * 音频 MIME 类型
   * @en Audio MIME type.
   */
  type: { type: String, default: '' },
  /**
   * 预先计算的波形，数值会自动归一化到 0~1
   * @en Precomputed waveform values, automatically normalized to 0–1.
   */
  waveform: { type: Array as PropType<number[]>, default: undefined },
  /**
   * 波形来源：自动解码、稳定模拟或不显示
   * @en Waveform strategy: decode automatically, generate a stable mock, or hide it.
   */
  waveformSource: {
    type: String as PropType<AudioWaveformSource>,
    default: 'auto',
  },
  /**
   * 模拟波形种子；默认使用 src，同一种子始终得到相同波形
   * @en Seed for mock waveforms. Falls back to src and is deterministic.
   */
  mockSeed: { type: String, default: '' },
  /**
   * 波形柱数量
   * @en Number of waveform bars.
   */
  barCount: {
    type: Number,
    default: 72,
    validator: (value: number) => Number.isInteger(value) && value >= 8 && value <= 300,
  },
  /**
   * 是否自动播放
   * @en Whether to start playback automatically.
   */
  autoplay: { type: Boolean, default: false },
  /**
   * 是否循环播放
   * @en Whether to loop playback.
   */
  loop: { type: Boolean, default: false },
  /**
   * 是否禁用
   * @en Whether the player is disabled.
   */
  disabled: { type: Boolean, default: false },
  /**
   * 音频元素预加载策略
   * @en Native audio preload strategy.
   */
  preload: {
    type: String as PropType<'none' | 'metadata' | 'auto'>,
    default: 'metadata',
  },
  /**
   * 初始音量，范围为 0~1
   * @en Initial volume between 0 and 1.
   */
  volume: {
    type: Number,
    default: 1,
    validator: (value: number) => value >= 0 && value <= 1,
  },
  /**
   * 可选择的播放倍速
   * @en Available playback rates.
   */
  playbackRates: {
    type: Array as PropType<number[]>,
    default: () => [0.5, 1, 1.5, 2],
  },
  /**
   * 自定义无障碍名称；未传入时使用当前语言的默认文案
   * @en Custom accessible name. Uses the active locale when omitted.
   */
  ariaLabel: { type: String, default: '' },
});

export type AudioPlayerProps = ExtractPropTypes<typeof useAudioPlayerProps>;
