import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useListProps = declarePropType({
  /**
   * 列表数据，需要和 `item` 插槽同时使用，或者结合 `ListItem` 组件
   * @en Configuration for data.
   */
  data: {
    type: Array as PropType<any[]>,
    required: false,
  },
  /**
   * 是否以斑马纹的形式显示
   * @en Configuration for zebra.
   */
  zebra: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否带边框
   * @en Configuration for border.
   */
  border: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示分割线
   * @en Configuration for split.
   */
  split: {
    type: Boolean,
    default: true,
  },
  /**
   * 列表的最大高度
   * @en Configuration for max height.
   */
  maxHeight: {
    type: Number,
    default: 0,
  },
  /**
   * 列表Item的大小
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<'medium' | 'small'>,
    required: false,
  },
});

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
    type: String as PropType<'medium' | 'small'>,
    required: false,
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
    default: true,
  },
  /**
   * 列表项的内容
   * @en Configuration for describe.
   */
  describe: {
    type: String,
    required: false,
  },
});

export type ListProps = ExtractPropTypes<typeof useListProps>;
export type ListItemProps = ExtractPropTypes<typeof useListItemProps>;
