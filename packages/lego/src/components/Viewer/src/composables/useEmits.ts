import { isBoolean } from '@nio-fe/shared';

export const useViewerEmits = {
  /**
   *  更新 `modelValue`
   */
  'update:modelValue': (value: false) => isBoolean(value),
};

export type ViewerEmits = typeof useViewerEmits;
