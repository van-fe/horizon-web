import { useCascaderEmits } from '@aurora/horizon-web';

export const useModalCascaderEmits = {
  ...useCascaderEmits,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type ModalCascaderEmits = typeof useModalCascaderEmits;
