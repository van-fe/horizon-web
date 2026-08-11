import type { HorizonWebSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { SelectProps, OptionProps, OptionGroupProps } from '../composables/useProps';
import type { SelectEmits } from '../composables/useEmits';
import type { OptionSlots, SelectSlots } from '../composables/useSlots';

export interface SelectCollectedOptionData<T extends 'option' | 'option-group'> {
  props: T extends 'option' ? OptionProps : OptionGroupProps & { value: string };
  attrs: Record<string, unknown>;
  slots: T extends 'option' ? HorizonWebSetupContext<{}, OptionSlots>['slots'] : undefined;
  parentProps?: T extends 'option' ? OptionGroupProps : undefined;
  type: T;
  el: Ref<HTMLElement | null>;
  active: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  children: T extends 'option'
    ? null
    : Map<OptionProps['value'], SelectCollectedOptionData<'option'>>;
}

export const HSelectModelValueInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'model-value'),
) as InjectionKey<Ref<Set<any>>>;

export const HSelectPresetModelValueInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'preset-model-value'),
) as InjectionKey<Ref<Set<any>>>;

export const HSelectPropsInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'props'),
) as InjectionKey<SelectProps>;

export const HOptionGroupPropsInjectKey = Symbol.for(
  generatorInjectedKeyName('option-group', 'props'),
) as InjectionKey<OptionGroupProps>;

export const HSelectEmitsInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'emits'),
) as InjectionKey<HorizonWebSetupContext<SelectEmits>['emit']>;

export const HSelectSlotsInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'slots'),
) as InjectionKey<HorizonWebSetupContext<{}, SelectSlots>['slots']>;

export const HSelectPopperVisibleInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const HSelectAddOptionInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'add-option'),
) as InjectionKey<
  <T extends 'option' | 'option-group'>(value: SelectCollectedOptionData<T>) => void
>;

export const HSelectRemoveOptionInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'remove-option'),
) as InjectionKey<(optionValue: OptionProps['value']) => void>;

export const HSelectPickOptionInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'picker-option'),
) as InjectionKey<(value: OptionProps['value']) => void>;

export const HSelectVisibleOptionsInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'visible-options'),
) as InjectionKey<ComputedRef<SelectCollectedOptionData<'option'>[]>>;

export const HSelectFocusedOptionValueInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'focused-option-value'),
) as InjectionKey<Ref<OptionProps['value'] | undefined>>;

export const HSelectVirtualScrollListIsScrollingInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'virtual-scroll-list-is-scrolling'),
) as InjectionKey<Ref<boolean>>;

export const HSelectInputValueInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'input-value'),
) as InjectionKey<Ref<string>>;

export const HSelectFilterInputValueInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'filter-input-value'),
) as InjectionKey<Ref<string>>;

export const HSelectMouseOverOptionInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'mouse-over-option'),
) as InjectionKey<(value: OptionProps['value']) => void>;

export const HSelectHighlightContentRangesInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'highlight-content-ranges'),
) as InjectionKey<Ref<Map<OptionProps['value'], Range>>>;

export const HSelectHighlightDescriptionRangesInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'highlight-description-ranges'),
) as InjectionKey<Ref<Map<OptionProps['value'], Range>>>;
