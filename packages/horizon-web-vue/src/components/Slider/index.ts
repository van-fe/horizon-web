import { default as Slider } from './src/Slider';
import { withInstall } from '@aurora/utils';

export const HSlider = withInstall(Slider);
export default HSlider;

export type { SliderProps } from './src/composables/useProps';
export type { SliderExposes } from './src/composables/useExposes';
export type {
  SliderRangeValue,
  SliderTone,
  SliderTooltipFormatter,
  SliderTooltipPlacement,
  SliderValue,
} from '@aurora/core';
