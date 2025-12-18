import { generatorInjectedKeyName } from '@aurora/utils';
import type { InjectionKey, Ref } from 'vue';
import type { SliderProps } from '../composables/useProps';

export const NSliderPropsInjectedKey = Symbol.for(
  generatorInjectedKeyName('slider', 'props'),
) as InjectionKey<SliderProps>;

export const NSliderTrackWidthInjectedKey = Symbol.for(
  generatorInjectedKeyName('slider', 'track-width'),
) as InjectionKey<Ref<number>>;

export const NSliderTrackLeftInjectedKey = Symbol.for(
  generatorInjectedKeyName('slider', 'track-left'),
) as InjectionKey<Ref<number>>;

export const NSliderGetTrackSizeInjectedKey = Symbol(
  generatorInjectedKeyName('slider', 'get-track-size'),
) as InjectionKey<() => { width: number; left: number }>;
