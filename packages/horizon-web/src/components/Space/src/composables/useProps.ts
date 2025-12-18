import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType, StyleValue } from 'vue';
import { type NApplicationSizeType } from '~/components/Application/src/composables/useProps';

export type NSpaceSize =
  | NApplicationSizeType
  | number
  | string
  | [number, number]
  | [string, string];

export const useSpaceProps = declarePropType({
  /**
   * 将宽度调整为父元素宽度
   */
  block: {
    type: Boolean,
  },

  /**
   * 对齐方式
   */
  align: {
    type: String as PropType<'start' | 'end' | 'center' | 'baseline'>,
  },

  /**
   * 间距大小
   */
  size: {
    type: [String, Number, Array] as PropType<NSpaceSize>,
    default: 'medium',
  },

  /**
   * 间距方向
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },

  /**
   * 是否换行，仅在 `type=horizontal` 时有效
   */
  wrap: {
    type: Boolean,
  },

  /**
   * 是否转化 Fragment 节点列表
   * @version 2.7.0
   */
  fragment: {
    type: Boolean,
    default: true,
  },

  /**
   * 启用分隔符
   * @version 2.12.11
   */
  separator: {
    type: Boolean,
    default: false,
  },
});

export const useSpaceItemProps = declarePropType({
  class: {
    type: [String, Array],
  },
  style: {
    type: [String, Object] as PropType<StyleValue>,
  },
});

export type SpaceProps = ExtractPropTypes<typeof useSpaceProps>;
export type SpaceItemProps = ExtractPropTypes<typeof useSpaceItemProps>;
