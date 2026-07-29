import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export interface Source {
  /** 视频地址
   * @en Configuration for src.
 */
  src: string;
  /** 视频类型，如 `video/mp4` */
  type?: string;
}

export const useVideoPlayerProps = declarePropType({
  /** 视频资源，是一个数组，如果传入了超过一个资源则会自动选择
   * @en Configuration for sources.
 */
  sources: {
    type: Array as PropType<Source[]>,
    required: true,
  },
  /** 视频的封面图片地址，一旦开始播放，图片就会消失
   * @en Configuration for poster.
 */
  poster: {
    type: String,
    default: '',
    required: false,
  },
  /** 视频旋转角度
   * @en Configuration for rotate.
 */
  rotate: {
    type: Number as PropType<0 | 90 | 180 | 270>,
    default: 0,
  },
});
export type VideoPlayerProps = ExtractPropTypes<typeof useVideoPlayerProps>;
