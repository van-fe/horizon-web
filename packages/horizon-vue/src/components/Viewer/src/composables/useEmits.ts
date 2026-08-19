import { isBoolean } from '@aurora/utils';

export const useViewerEmits = {
  /**
   *  更新 `modelValue`
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (value: false) => isBoolean(value),
};

export type ViewerEmits = typeof useViewerEmits;
