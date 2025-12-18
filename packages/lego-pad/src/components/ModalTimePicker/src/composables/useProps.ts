import { declarePropType } from '@aurora/shared';
import { useTimePickerProps, type NDrawerProps } from '@aurora/horizon-web';
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
