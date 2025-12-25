import { generatorInjectedKeyName } from '@aurora/utils';
import type { InjectionKey, Ref } from 'vue';
import type { SliderProps } from '../composables/useProps';

export const HSliderPropsInjectedKey = Symbol.for(
  generatorInjectedKeyName('slider', 'props'),
) as InjectionKey<SliderProps>;

export const HSliderTrackWidthInjectedKey = Symbol.for(
  generatorInjectedKeyName('slider', 'track-width'),
) as InjectionKey<Ref<number>>;

export const HSliderTrackLeftInjectedKey = Symbol.for(
  generatorInjectedKeyName('slider', 'track-left'),
) as InjectionKey<Ref<number>>;

export const HSliderGetTrackSizeInjectedKey = Symbol(
  generatorInjectedKeyName('slider', 'get-track-size'),
) as InjectionKey<() => { width: number; left: number }>;
