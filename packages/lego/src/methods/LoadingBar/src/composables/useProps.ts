import type { PropType } from 'vue';
import type { ExtractMethodOptions } from '@nio-fe/shared';
import { declarePropType } from '@nio-fe/shared';

export const useLoadingBarOptions = declarePropType({
  /**
   * `LoadingBar` 高度
   */
  height: {
    type: Number,
    default: 2,
    required: false,
  },
  /**
   * `LoadingBar` 进度
   */
  percent: {
    type: Number,
    default: 0,
    required: false,
  },
  /**
   * `LoadingBar` 状态
   */
  status: {
    type: String as PropType<'primary' | 'error'>,
    default: 'primary',
    required: false,
  },
  /**
   * `LoadingBar` 是否显示
   */
  show: {
    type: Boolean,
    default: false,
    required: false,
  },
});

export type LoadingBarOptions = ExtractMethodOptions<typeof useLoadingBarOptions>;
