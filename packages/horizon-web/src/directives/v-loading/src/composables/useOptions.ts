import type { DirectiveOptionType, ExtractDirectiveOptionTypes } from '@aurora/utils';
import { declareDirectiveOptionType } from '@aurora/utils';

export const useLoadingOptions = declareDirectiveOptionType({
  /**
   * 是否显示 `loading` 动画
   * @en Whether Display loading 动画
   */
  isShow: {
    type: Boolean,
  },
  /**
   * `loading` 动画类型
   * @en Loading 动画type
   */
  loadingType: {
    type: String as DirectiveOptionType<'circle' | 'dots'>,
  },
  /**
   * 加载文案
   * @en Loading text
   */
  textOrient: {
    type: String as DirectiveOptionType<'column' | 'row'>,
  },
  /**
   * 加载文案的朝向
   * @en Loading text的朝向
   */
  text: {
    type: String,
  },
  /**
   * 	`loading` 动画大小
   * @en Loading 动画size
   */
  size: {
    type: String as DirectiveOptionType<'large' | 'medium' | 'small'>,
    default: 'medium',
  },
  /**
   * `loading` 动画背景颜色及透明度
   * @en Loading 动画背景color及opacity
   */
  bgc: {
    type: String,
    required: false,
  },
  /**
   * `loading` 动画是否全屏
   * @en Loading 动画Whether fullscreen
   */
  fullscreen: {
    type: Boolean,
    required: false,
  },
  /**
   * 延迟显示时间，单位ms
   * 如果请求响应非常快，则推荐设置 `500-1000`，避免闪屏
   * @en DelayDisplay time, unitms 如果request响应非常快, 则推荐Set 500-1000, 避免闪屏
   */
  delay: {
    type: Number,
    required: false,
  },
  /**
   * 层级
   * @en Z-index
   */
  zIndex: {
    type: [Number, String],
  },
});

export type LoadingOptions = ExtractDirectiveOptionTypes<boolean | typeof useLoadingOptions>;
