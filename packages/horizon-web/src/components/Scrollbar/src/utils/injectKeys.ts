import type { InjectionKey, Ref, ComputedRef } from 'vue';
import type { ScrollbarProps } from '../composables/useProps';
import { generatorInjectedKeyName } from '@aurora/utils';

export const HScrollbarPropsInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'props'),
) as InjectionKey<ScrollbarProps>;

export const HScrollbarViewSizeInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'view size'),
) as InjectionKey<Ref<{ width: number; height: number }>>;

export const HScrollbarThumbTopInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'thumb top'),
) as InjectionKey<ComputedRef<number>>;

export const HScrollbarThumbBottomInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'thumb bottom'),
) as InjectionKey<ComputedRef<number>>;

export const HScrollbarThumbLeftInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'thumb left'),
) as InjectionKey<ComputedRef<number>>;

export const HScrollbarThumbRightInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'thumb right'),
) as InjectionKey<ComputedRef<number>>;

export const HScrollbarUpdateDelayInjectKey = Symbol.for(
  generatorInjectedKeyName('scrollbar', 'update delay'),
) as InjectionKey<number>;
