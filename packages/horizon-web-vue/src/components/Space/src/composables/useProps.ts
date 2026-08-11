import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType, StyleValue } from 'vue';
import { type HApplicationSizeType } from '~/components/Application/src/composables/useProps';

export type HSpaceSize =
  | HApplicationSizeType
  | number
  | string
  | [number, number]
  | [string, string];

export const useSpaceProps = declarePropType({
  /**
   * 将宽度调整为父元素宽度
    * @en Configuration for block.
   */
  block: {
    type: Boolean,
  },

  /**
   * 对齐方式
    * @en Configuration for align.
   */
  align: {
    type: String as PropType<'start' | 'end' | 'center' | 'baseline'>,
  },

  /**
   * 间距大小
    * @en Configuration for size.
   */
  size: {
    type: [String, Number, Array] as PropType<HSpaceSize>,
    default: 'medium',
  },

  /**
   * 间距方向
    * @en Configuration for direction.
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },

  /**
   * 是否换行，仅在 `type=horizontal` 时有效
    * @en Configuration for wrap.
   */
  wrap: {
    type: Boolean,
  },

  /**
   * 是否转化 Fragment 节点列表
    * @en Configuration for fragment.
   */
  fragment: {
    type: Boolean,
    default: true,
  },

  /**
   * 启用分隔符
    * @en Configuration for separator.
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
