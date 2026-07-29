import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export type HColumnResponsiveSetting = {
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
    * @en Configuration for tag.
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * 栅格占据列数
    * @en Configuration for span.
   */
  span: {
    type: Number,
  },
  /**
   * 栅格左侧偏移间隔数
    * @en Configuration for offset.
   */
  offset: {
    type: Number,
    default: 0,
  },
  /**
   * 向左移动格数
    * @en Configuration for pull.
   */
  pull: {
    type: Number,
    required: false,
  },
  /**
   * 向右移动格数
    * @en Configuration for push.
   */
  push: {
    type: Number,
    required: false,
  },
  /**
   * <480px 响应式栅格数或者栅格属性对象
    * @en Configuration for xs.
   */
  xs: {
    type: [Number, Object] as PropType<number | HColumnResponsiveSetting>,
    required: false,
  },
  /**
   * ≥480px 响应式栅格数或者栅格属性对象
    * @en Configuration for sm.
   */
  sm: {
    type: [Number, Object] as PropType<number | HColumnResponsiveSetting>,
    required: false,
  },
  /**
   * ≥1024px 响应式栅格数或者栅格属性对象
    * @en Configuration for md.
   */
  md: {
    type: [Number, Object] as PropType<number | HColumnResponsiveSetting>,
    required: false,
  },
  /**
   * ≥1440px 响应式栅格数或者栅格属性对象
    * @en Configuration for lg.
   */
  lg: {
    type: [Number, Object] as PropType<number | HColumnResponsiveSetting>,
    required: false,
  },
  /**
   * ≥1920px 响应式栅格数或者栅格属性对象
    * @en Configuration for xl.
   */
  xl: {
    type: [Number, Object] as PropType<number | HColumnResponsiveSetting>,
    required: false,
  },
  /**
   * ≥2880px 响应式栅格数或者栅格属性对象
    * @en Configuration for xxl.
   */
  xxl: {
    type: [Number, Object] as PropType<number | HColumnResponsiveSetting>,
    required: false,
  },
});

export const useRowProps = declarePropType({
  /** 标签
   * @en Configuration for tag.
 */
  tag: {
    type: String,
    default: 'div',
  },
  /** 栅格间，包括水平和垂直间隔
   * @en Configuration for gutter.
 */
  gutter: {
    type: Number,
  },
  /**
   * 水平间隔
    * @en Configuration for hspace.
   */
  hspace: {
    type: Number,
  },
  /**
   * 垂直间隔
    * @en Configuration for vspace.
   */
  vspace: {
    type: Number,
  },
  /** flex 布局下的水平排列方式
   * @en Configuration for justify.
 */
  justify: {
    type: String as PropType<
      'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly'
    >,
  },
  /** flex 布局下的垂直排列方式
   * @en Configuration for align.
 */
  align: {
    type: String as PropType<'top' | 'middle' | 'bottom'>,
  },
});

export type RowProps = ExtractPropTypes<typeof useRowProps>;
export type ColProps = ExtractPropTypes<typeof useRowProps>;
