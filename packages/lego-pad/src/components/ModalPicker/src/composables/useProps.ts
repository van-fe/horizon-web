import { declarePropType } from '@nio-fe/shared';
import { usePickerProps, type NDrawerProps } from '@nio-fe/lego';
import type { ExtractPropTypes, PropType } from 'vue';

export const useModalPickerProps = declarePropType({
  ...usePickerProps,
  /**
   * 抽屉属性
   */
  drawerProps: {
    type: Object as PropType<NDrawerProps>,
    default: () => ({}),
  },
});

export type ModalPickerProps = ExtractPropTypes<typeof useModalPickerProps>;
