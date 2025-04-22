import type { ExposeType, ExtractExposeTypes } from '@nio-fe/shared';
import type { Ref } from 'vue';

export const useColorPickerExposes = {
  /**
   * 当 `triggerType` 为 `input` 时，可以获取到 `input` 对象
   */
  colorPicker: Object as ExposeType<Ref<HTMLInputElement>>,
};

export type ColorPickerExposes = ExtractExposeTypes<typeof useColorPickerExposes>;
