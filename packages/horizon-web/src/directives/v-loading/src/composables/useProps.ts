import type { ExtractPropTypes, PropType } from 'vue';

export const useLoadingProps = {
  /** loading动画类型
   * @en Loading animationtype
   */
  loadingType: {
    type: String as PropType<'circle' | 'dots'>,
    required: false,
    default: 'circle',
  },
  /** 加载文案的朝向
   * @en Loading text的direction
   */
  textOrient: {
    type: String as PropType<'column' | 'row'>,
    required: false,
    default: 'column',
  },
  /** 加载文案
   * @en Loading text
   */
  text: {
    type: String,
    required: false,
    default: '',
  },
  /** loading动画大小
   * @en Loading animationsize
   */
  size: {
    type: String as PropType<'large' | 'medium' | 'small'>,
    required: false,
    default: 'medium',
  },
  /** loading动画背景颜色及透明度
   * @en Loading animationbackground color and opacity
   */
  bgc: {
    type: String,
    required: false,
    default: '#ffffff80',
  },
  /** loading动画是否全屏
   * @en Loading animationWhether fullscreen
   */
  fullscreen: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 层级
   * @en Z-index
   */
  zIndex: {
    type: Number,
    default: 1000,
  },
  /**
   * 延迟显示时间，单位ms
   * 如果请求响应非常快，则推荐设置 500-1000，避免闪屏
   * @en DelayDisplay time, unitms 如果request响应非常快, 则推荐Set 500-1000, 避免闪屏
   */
  delay: {
    type: Number,
    default: 0,
  },
};

export type LoadingProps = ExtractPropTypes<typeof useLoadingProps>;
