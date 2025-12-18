import { useSelectEmits } from '@nio-fe/lego';

export const useModalSelectEmits = {
  ...useSelectEmits,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type ModalSelectEmits = typeof useModalSelectEmits;
