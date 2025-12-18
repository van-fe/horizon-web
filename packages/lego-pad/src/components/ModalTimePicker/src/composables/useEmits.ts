import { useTimePickerEmits } from '@nio-fe/lego';

export const useModalTimePickerEmits = {
  ...useTimePickerEmits,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type ModalTimePickerEmits = typeof useModalTimePickerEmits;
