import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType, StyleValue } from 'vue';
import type { SpaceAlign, SpaceDirection, SpaceSize } from '@aurora/core';
import { isSpaceAlign, isSpaceDirection, isSpaceSize, SPACE_DEFAULTS } from '@aurora/core';
import { type HApplicationSizeType } from '~/components/Application/src/composables/useProps';

export type HSpaceSize = SpaceSize | HApplicationSizeType;

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
    type: String as PropType<SpaceAlign>,
    validator: isSpaceAlign,
  },

  /**
   * 间距大小
   * @en Configuration for size.
   */
  size: {
    type: [String, Number, Array] as PropType<HSpaceSize>,
    default: SPACE_DEFAULTS.size,
    validator: isSpaceSize,
  },

  /**
   * 间距方向
   * @en Configuration for direction.
   */
  direction: {
    type: String as PropType<SpaceDirection>,
    default: SPACE_DEFAULTS.direction,
    validator: isSpaceDirection,
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
