import { useTimePickerV2Emits } from '@nio-fe/lego';

export const useModalTimePickerEmits = {
  ...useTimePickerV2Emits,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type ModalTimePickerEmits = typeof useModalTimePickerEmits;
