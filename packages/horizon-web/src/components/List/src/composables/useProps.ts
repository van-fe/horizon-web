import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/shared';

export const useListProps = declarePropType({
  /**
   * 列表数据，需要和 `item` 插槽同时使用，或者结合 `ListItem` 组件
   */
  data: {
    type: Array as PropType<any[]>,
    required: false,
  },
  /**
   * 是否以斑马纹的形式显示
   */
  zebra: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否带边框
   * @deprecated 请改用 `props.border`
   */
  isBorder: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否带边框
   * @version 2.0.0-beta.7 与 `isBorder` 相同
   */
  border: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示分割线
   */
  split: {
    type: Boolean,
    default: true,
  },
  /**
   * 列表的最大高度
   */
  maxHeight: {
    type: Number,
    default: 0,
  },
  /**
   * 列表Item的大小
   */
  size: {
    type: String as PropType<'medium' | 'small'>,
    required: false,
  },
});

export const useListItemProps = declarePropType({
  /**
   * 列表项的标题
   */
  title: {
    type: String,
    required: false,
  },
  /**
   * 列表项的标题大小
   */
  titleSize: {
    type: String as PropType<'medium' | 'small'>,
    required: false,
  },
  /**
   * 列表项的副标题
   */
  subtitle: {
    type: String,
    required: false,
  },
  /**
   * 标题是否加粗
   * @version 2.0.0-beta.7
   */
  titleBold: {
    type: Boolean,
    default: true,
  },
  /**
   * 列表项的内容
   */
  describe: {
    type: String,
    required: false,
  },
});

export type ListProps = ExtractPropTypes<typeof useListProps>;
export type ListItemProps = ExtractPropTypes<typeof useListItemProps>;
