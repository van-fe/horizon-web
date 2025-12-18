import type { ExtractPropTypes, PropType } from 'vue';
import type { VideoJsPlayerOptions } from 'video.js';
import { declarePropType } from '@aurora/utils';

declare module 'video.js' {
  interface VideoJsPlayerOptions {
    hotkeys?: boolean;
  }
}

export interface Source {
  /** 视频地址 */
  src: string;
  /** 视频类型，如 `video/mp4` */
  type?: string;
}

export const useVideoPlayerProps = declarePropType({
  /** 视频资源，是一个数组，如果传入了超过一个资源则会自动选择 */
  sources: {
    type: Array as PropType<Source[]>,
    required: true,
  },
  /** 视频的封面图片地址，一旦开始播放，图片就会消失 */
  poster: {
    type: String,
    default: '',
    required: false,
  },
  /** 视频旋转角度 */
  rotate: {
    type: Number as PropType<0 | 90 | 180 | 270>,
    default: 0,
  },
  /** video.js 的参数对象 */
  options: {
    type: Object as PropType<VideoJsPlayerOptions>,
    default: () => {},
    required: false,
  },
});
export type VideoPlayerProps = ExtractPropTypes<typeof useVideoPlayerProps>;
