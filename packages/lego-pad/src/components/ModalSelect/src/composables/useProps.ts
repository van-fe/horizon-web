import { declarePropType } from '@aurora/shared';
import { useSelectProps, type NDrawerProps } from '@aurora/horizon-web';
import type { ExtractPropTypes, PropType } from 'vue';

export const useModalSelectProps = declarePropType({
  ...useSelectProps,
  /**
   * 是否在面板中展示已选择的标签
   * 多选：默认展示
   * 单选：默认不展示
   */
  showSelectedTagsInPanel: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 抽屉属性
   */
  drawerProps: {
    type: Object as PropType<NDrawerProps>,
    default: () => ({}),
  },
});

export type ModalSelectProps = ExtractPropTypes<typeof useModalSelectProps>;
