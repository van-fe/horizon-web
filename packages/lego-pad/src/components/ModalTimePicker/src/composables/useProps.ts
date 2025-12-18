import { declarePropType } from '@nio-fe/shared';
import { useTimePickerProps, type NDrawerProps } from '@nio-fe/lego';
import type { ExtractPropTypes, PropType } from 'vue';

export const useModalTimePickerProps = declarePropType({
  ...useTimePickerProps,
  /**
   * 抽屉属性
   */
  drawerProps: {
    type: Object as PropType<NDrawerProps>,
    default: () => ({}),
  },
});

export type ModalTimePickerProps = ExtractPropTypes<typeof useModalTimePickerProps>;
