import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useColorPickerExposes = {
  /**
   * 当 `triggerType` 为 `input` 时，可以获取到 `input` 对象
    * @en Controls color picker.
   */
  colorPicker: Object as ExposeType<HTMLInputElement | null>,
};

export type ColorPickerExposes = ExtractExposeTypes<typeof useColorPickerExposes>;
