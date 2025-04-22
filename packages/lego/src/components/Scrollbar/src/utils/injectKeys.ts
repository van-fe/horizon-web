import type { InjectionKey, Ref } from 'vue';
import type { ScrollbarProps } from '../composables/useProps';
import { generatorInjectedKeyName } from '@nio-fe/shared';

export const NScrollbarPropsInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'props'),
) as InjectionKey<ScrollbarProps>;

export const NScrollbarViewSizeInjectKey = Symbol(
  generatorInjectedKeyName('scrollbar', 'view size'),
) as InjectionKey<Ref<{ width: number; height: number }>>;

export const NScrollbarUpdateDelayInjectKey = Symbol.for(
  generatorInjectedKeyName('scrollbar', 'update delay'),
) as InjectionKey<number>;
