import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export interface Source {
  /**
   * 视频地址
   * @en Video source URL.
   */
  src: string;
  /**
   * 视频 MIME 类型，如 `video/mp4`
   * @en Video MIME type, such as `video/mp4`.
   */
  type?: string;
  /**
   * 清晰度或视频源展示名称
   * @en Display label for the quality or source.
   */
  label?: string;
  /**
   * `label` 的兼容别名
   * @en Compatibility alias for `label`.
   */
  quality?: string;
  /**
   * 是否作为默认视频源
   * @en Whether this source is selected initially.
   */
  default?: boolean;
}

export const useVideoPlayerProps = declarePropType({
  /**
   * 视频资源列表，传入多个资源时会显示清晰度选择菜单
   * @en Video source list. A quality selector is displayed when multiple sources are provided.
   */
  sources: {
    type: Array as PropType<Source[]>,
    required: true,
    validator: (sources: Source[]) =>
      sources.every(source => typeof source?.src === 'string' && source.src.length > 0),
  },
  /**
   * 视频封面地址，开始播放后封面会自动隐藏
   * @en Poster image URL. The poster is hidden after playback starts.
   */
  poster: {
    type: String,
    default: '',
    required: false,
  },
  /**
   * 视频旋转角度
   * @en Video rotation in degrees.
   */
  rotate: {
    type: Number as PropType<0 | 90 | 180 | 270>,
    default: 0,
    validator: (value: number) => [0, 90, 180, 270].includes(value),
  },
  /**
   * 是否自动播放
   * @en Whether to start playback automatically.
   */
  autoplay: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否循环播放
   * @en Whether to loop playback.
   */
  loop: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否静音
   * @en Whether the video is muted.
   */
  muted: {
    type: Boolean,
    default: false,
  },
  /**
   * 初始音量，取值范围为 0 到 1
   * @en Initial volume between 0 and 1.
   */
  volume: {
    type: Number,
    default: 1,
    validator: (value: number) => value >= 0 && value <= 1,
  },
  /**
   * 视频预加载策略
   * @en Native video preload strategy.
   */
  preload: {
    type: String as PropType<'none' | 'metadata' | 'auto'>,
    default: 'metadata',
  },
  /**
   * 可选播放倍速
   * @en Playback rates displayed in the speed menu.
   */
  playbackRates: {
    type: Array as PropType<number[]>,
    default: () => [0.5, 0.75, 1, 1.25, 1.5, 2],
    validator: (rates: number[]) =>
      rates.length > 0 && rates.every(rate => Number.isFinite(rate) && rate > 0),
  },
});
export type VideoPlayerProps = ExtractPropTypes<typeof useVideoPlayerProps>;
