import type { DirectiveOptionType, ExtractDirectiveOptionTypes } from '@aurora/utils';
import { declareDirectiveOptionType } from '@aurora/utils';

export const useInfiniteScrollOptions = declareDirectiveOptionType({
  /**
   * 允许触发回调
   */
  block: {
    type: Boolean as DirectiveOptionType<boolean>,
    default: false,
  },
  /**
   * 触底回调函数。
   */
  onReachBottom: {
    type: Function as DirectiveOptionType<() => void>,
    required: true,
  },
  /**
   * 触顶回调函数。
   */
  onReachTop: {
    type: Function as DirectiveOptionType<() => void>,
    required: false,
  },
  /**
   * 距离底部的高度
   */
  distance: {
    type: Number,
    required: false,
  },
  /**
   * 防抖时间（毫秒）
   */
  interval: {
    type: Number,
    required: false,
  },
});

export type InfiniteScrollOptions = ExtractDirectiveOptionTypes<typeof useInfiniteScrollOptions>;
