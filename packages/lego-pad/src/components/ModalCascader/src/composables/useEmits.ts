import { useCascaderEmits } from '@nio-fe/lego';

export const useModalCascaderEmits = {
  ...useCascaderEmits,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type ModalCascaderEmits = typeof useModalCascaderEmits;
