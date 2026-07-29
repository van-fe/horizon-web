import type { PropType } from 'vue';
import type { ExtractMethodOptions } from '@aurora/utils';
import { declarePropType } from '@aurora/utils';

export const useLoadingBarOptions = declarePropType({
  /**
   * `LoadingBar` 高度
   * @en LoadingBar height
   */
  height: {
    type: Number,
    default: 2,
    required: false,
  },
  /**
   * `LoadingBar` 进度
   * @en LoadingBar progress
   */
  percent: {
    type: Number,
    default: 0,
    required: false,
  },
  /**
   * `LoadingBar` 状态
   * @en LoadingBar status
   */
  status: {
    type: String as PropType<'primary' | 'error'>,
    default: 'primary',
    required: false,
  },
  /**
   * `LoadingBar` 是否显示
   * @en LoadingBar Whether Display
   */
  show: {
    type: Boolean,
    default: false,
    required: false,
  },
});

export type LoadingBarOptions = ExtractMethodOptions<typeof useLoadingBarOptions>;
