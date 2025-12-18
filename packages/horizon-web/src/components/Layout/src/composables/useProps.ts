import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export type NColumnResponsiveSetting = {
  /**
   * 栅格占据列数
   */
  span?: number;
  /**
   * 栅格左侧偏移间隔数
   */
  offset?: number;
  /**
   * 向左移动格数
   */
  pull?: number;
  /**
   * 向右移动格数
   */
  push?: number;
};

export const useColProps = declarePropType({
  /**
   * 标签
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * 栅格占据列数
   */
  span: {
    type: Number,
  },
  /**
   * 栅格左侧偏移间隔数
   */
  offset: {
    type: Number,
    default: 0,
  },
  /**
   * 向左移动格数
   * @version 2.0.5
   */
  pull: {
    type: Number,
    required: false,
  },
  /**
   * 向右移动格数
   * @version 2.0.5
   */
  push: {
    type: Number,
    required: false,
  },
  /**
   * <480px 响应式栅格数或者栅格属性对象
   * @version 2.0.5
   */
  xs: {
    type: [Number, Object] as PropType<number | NColumnResponsiveSetting>,
    required: false,
  },
  /**
   * ≥480px 响应式栅格数或者栅格属性对象
   * @version 2.0.5
   */
  sm: {
    type: [Number, Object] as PropType<number | NColumnResponsiveSetting>,
    required: false,
  },
  /**
   * ≥1024px 响应式栅格数或者栅格属性对象
   * @version 2.0.5
   */
  md: {
    type: [Number, Object] as PropType<number | NColumnResponsiveSetting>,
    required: false,
  },
  /**
   * ≥1440px 响应式栅格数或者栅格属性对象
   * @version 2.0.5
   */
  lg: {
    type: [Number, Object] as PropType<number | NColumnResponsiveSetting>,
    required: false,
  },
  /**
   * ≥1920px 响应式栅格数或者栅格属性对象
   * @version 2.0.5
   */
  xl: {
    type: [Number, Object] as PropType<number | NColumnResponsiveSetting>,
    required: false,
  },
  /**
   * ≥2880px 响应式栅格数或者栅格属性对象
   * @version 2.0.5
   */
  xxl: {
    type: [Number, Object] as PropType<number | NColumnResponsiveSetting>,
    required: false,
  },
});

export const useRowProps = declarePropType({
  /** 标签 */
  tag: {
    type: String,
    default: 'div',
  },
  /** 栅格间，包括水平和垂直间隔 */
  gutter: {
    type: Number,
  },
  /**
   * 水平间隔
   * @version 2.0.5
   */
  hspace: {
    type: Number,
  },
  /**
   * 垂直间隔
   * @version 2.0.5
   */
  vspace: {
    type: Number,
  },
  /** flex 布局下的水平排列方式 */
  justify: {
    type: String as PropType<
      'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly'
    >,
  },
  /** flex 布局下的垂直排列方式 */
  align: {
    type: String as PropType<'top' | 'middle' | 'bottom'>,
  },
});

export type RowProps = ExtractPropTypes<typeof useRowProps>;
export type ColProps = ExtractPropTypes<typeof useRowProps>;
