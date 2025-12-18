import { declarePropType } from '@aurora/shared';
import { useCascaderProps, type NDrawerProps } from '@aurora/horizon-web';
import type { ExtractPropTypes, PropType } from 'vue';

export const useModalCascaderProps = declarePropType({
  ...useCascaderProps,
  /**
   * 是否在面板中展示已选标签
   * 多选：默认展示
   * 单选：默认不展示
   */
  showSelectedTagsInPanel: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 抽屉属性 */
  drawerProps: {
    type: Object as PropType<NDrawerProps>,
    default: () => ({}),
  },
});

export type ModalCascaderProps = ExtractPropTypes<typeof useModalCascaderProps>;
