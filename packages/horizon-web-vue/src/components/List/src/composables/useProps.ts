import { isListMaxHeight, isListSize, LIST_DEFAULTS, LIST_ITEM_DEFAULTS } from '@aurora/core';
import type { ListCommonProps, ListItemCommonProps, ListSize } from '@aurora/core';
import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useListProps = declarePropType({
  /**
   * 列表数据，需要和 `item` 插槽同时使用，或者结合 `ListItem` 组件
   * @en Configuration for data.
   */
  data: {
    type: Array as PropType<unknown[]>,
    required: false,
  },
  /**
   * 是否以斑马纹的形式显示
   * @en Configuration for zebra.
   */
  zebra: {
    type: Boolean,
    default: LIST_DEFAULTS.zebra,
  },
  /**
   * 是否带边框
   * @en Configuration for border.
   */
  border: {
    type: Boolean,
    default: LIST_DEFAULTS.border,
  },
  /**
   * 是否显示分割线
   * @en Configuration for split.
   */
  split: {
    type: Boolean,
    default: LIST_DEFAULTS.split,
  },
  /**
   * 列表的最大高度
   * @en Configuration for max height.
   */
  maxHeight: {
    type: Number,
    default: LIST_DEFAULTS.maxHeight,
    validator: isListMaxHeight,
  },
  /**
   * 列表Item的大小
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<ListSize>,
    required: false,
    validator: isListSize,
  },
} satisfies Record<keyof ListCommonProps, unknown>);

export const useListItemProps = declarePropType({
  /**
   * 列表项的标题
   * @en Configuration for title.
   */
  title: {
    type: String,
    required: false,
  },
  /**
   * 列表项的标题大小
   * @en Configuration for title size.
   */
  titleSize: {
    type: String as PropType<ListSize>,
    required: false,
    validator: isListSize,
  },
  /**
   * 列表项的副标题
   * @en Configuration for subtitle.
   */
  subtitle: {
    type: String,
    required: false,
  },
  /**
   * 标题是否加粗
   * @en Configuration for title bold.
   */
  titleBold: {
    type: Boolean,
    default: LIST_ITEM_DEFAULTS.titleBold,
  },
  /**
   * 列表项的内容
   * @en Configuration for describe.
   */
  describe: {
    type: String,
    required: false,
  },
} satisfies Record<keyof ListItemCommonProps, unknown>);

export type ListProps = ExtractPropTypes<typeof useListProps>;
export type ListItemProps = ExtractPropTypes<typeof useListItemProps>;
