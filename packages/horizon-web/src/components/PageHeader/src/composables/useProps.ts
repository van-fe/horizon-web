import type { ExtractPropTypes } from 'vue';
import { declarePropType } from '@aurora/utils';
import { IconNullablePropType } from '~/utils/useIcon';
import { IconBack } from '@aurora/icon';

export const usePageHeaderProps = declarePropType({
  /**
   * 返回按钮图标
   * 设置为 `null` 即不需要返回按钮
   */
  icon: {
    type: IconNullablePropType,
    default: IconBack,
  },
  /**
   * 标题
   */
  title: {
    type: String,
  },
  /**
   * 内容
   */
  content: {
    type: String,
  },
  /**
   * 是否使用分割线
   */
  useDivider: {
    type: Boolean,
    default: true,
  },
  /**
   * 禁用header的Tooltip
   * @version 2.12.0
   */
  disabledHeaderTooltip: {
    type: Boolean,
    default: false,
  },
});

export type PageHeaderProps = ExtractPropTypes<typeof usePageHeaderProps>;
