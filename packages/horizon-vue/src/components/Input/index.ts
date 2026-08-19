import { default as Input } from './src/Input';
import { withInstall } from '@aurora/utils';

export const HInput = withInstall(Input);
export default HInput;

export type { InputProps } from './src/composables/useProps';
export type { InputExposes } from './src/composables/useExposes';
export type {
  InputAutoSize,
  InputAutoSizeOptions,
  InputResizeMode,
  InputStatus,
  InputType,
  InputVariant,
} from '@aurora/core';
