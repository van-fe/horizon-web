import { useSelectEmits } from '@aurora/horizon-web';

export const useModalSelectEmits = {
  ...useSelectEmits,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type ModalSelectEmits = typeof useModalSelectEmits;
