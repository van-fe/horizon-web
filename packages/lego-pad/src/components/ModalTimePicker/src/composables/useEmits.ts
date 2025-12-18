import { useTimePickerEmits } from '@aurora/horizon-web';

export const useModalTimePickerEmits = {
  ...useTimePickerEmits,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type ModalTimePickerEmits = typeof useModalTimePickerEmits;
