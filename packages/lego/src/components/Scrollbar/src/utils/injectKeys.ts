import type { InjectionKey, Ref, ComputedRef } from 'vue';
import type { ScrollbarProps } from '../composables/useProps';
import { generatorInjectedKeyName } from '@nio-fe/shared';

export const NScrollbarPropsInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'props'),
) as InjectionKey<ScrollbarProps>;

export const NScrollbarViewSizeInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'view size'),
) as InjectionKey<Ref<{ width: number; height: number }>>;

export const NScrollbarThumbTopInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'thumb top'),
) as InjectionKey<ComputedRef<number>>;

export const NScrollbarThumbBottomInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'thumb bottom'),
) as InjectionKey<ComputedRef<number>>;

export const NScrollbarThumbLeftInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'thumb left'),
) as InjectionKey<ComputedRef<number>>;

export const NScrollbarThumbRightInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'thumb right'),
) as InjectionKey<ComputedRef<number>>;

export const NScrollbarUpdateDelayInjectKey = Symbol.for(
  generatorInjectedKeyName('scrollbar', 'update delay'),
) as InjectionKey<number>;
