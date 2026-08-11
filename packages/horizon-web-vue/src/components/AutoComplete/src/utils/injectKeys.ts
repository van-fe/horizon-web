import type { HorizonWebSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { ComputedRef, InjectionKey, Ref, SetupContext } from 'vue';
import type { AutoCompleteProps, ModelValueType } from '../composables/useProps';
import type { AutoCompleteEmits } from '../composables/useEmits';
import type { AutoCompleteSlots } from '../composables/useSlots';
import type { HAutoCompleteOption, HAutoCompleteOptionWithUuid } from './typed';

export const HAutoCompletePropsInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'props'),
) as InjectionKey<AutoCompleteProps>;

export const HAutoCompleteEmitsInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'emits'),
) as InjectionKey<HorizonWebSetupContext<AutoCompleteEmits>['emit']>;

export const HAutoCompleteSlotsInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'slots'),
) as InjectionKey<SetupContext<{}, AutoCompleteSlots>['slots']>;

export const HAutoCompletePopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const HAutoCompletePickOptionInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'picker-option'),
) as InjectionKey<(value: HAutoCompleteOption['label'] | HAutoCompleteOption['value']) => void>;

export const HAutoCompleteVisibleOptionsInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'visible-options'),
) as InjectionKey<ComputedRef<HAutoCompleteOptionWithUuid[]>>;

export const HAutoCompleteFocusedOptionValueInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'focused-option-value'),
) as InjectionKey<Ref<HAutoCompleteOption['label'] | HAutoCompleteOption['value']>>;

export const HAutoCompleteVirtualScrollListIsScrollingInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'virtual-scroll-list-is-scrolling'),
) as InjectionKey<Ref<boolean>>;

export const HAutoCompleteModelValueInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'model-value'),
) as InjectionKey<Ref<ModelValueType>>;

export const HAutoCompleteMouseOverOptionInjectKey = Symbol(
  generatorInjectedKeyName('auto-complete', 'mouse-over-option'),
) as InjectionKey<(value: HAutoCompleteOption['label']) => void>;
