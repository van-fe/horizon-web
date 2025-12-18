import type { LegoSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { SelectProps, OptionProps, OptionGroupProps } from '../composables/useProps';
import type { SelectEmits } from '../composables/useEmits';
import type { OptionSlots, SelectSlots } from '../composables/useSlots';

export interface SelectCollectedOptionData<T extends 'option' | 'option-group'> {
  props: T extends 'option' ? OptionProps : OptionGroupProps & { value: string };
  attrs: Record<string, unknown>;
  slots: T extends 'option' ? LegoSetupContext<{}, OptionSlots>['slots'] : undefined;
  parentProps?: T extends 'option' ? OptionGroupProps : undefined;
  type: T;
  el: Ref<HTMLElement | null>;
  active: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  children: T extends 'option'
    ? null
    : Map<OptionProps['value'], SelectCollectedOptionData<'option'>>;
}

export const NSelectModelValueInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'model-value'),
) as InjectionKey<Ref<Set<any>>>;

export const NSelectPresetModelValueInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'preset-model-value'),
) as InjectionKey<Ref<Set<any>>>;

export const NSelectPropsInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'props'),
) as InjectionKey<SelectProps>;

export const NOptionGroupPropsInjectKey = Symbol.for(
  generatorInjectedKeyName('option-group', 'props'),
) as InjectionKey<OptionGroupProps>;

export const NSelectEmitsInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'emits'),
) as InjectionKey<LegoSetupContext<SelectEmits>['emit']>;

export const NSelectSlotsInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'slots'),
) as InjectionKey<LegoSetupContext<{}, SelectSlots>['slots']>;

export const NSelectPopperVisibleInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const NSelectAddOptionInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'add-option'),
) as InjectionKey<
  <T extends 'option' | 'option-group'>(value: SelectCollectedOptionData<T>) => void
>;

export const NSelectRemoveOptionInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'remove-option'),
) as InjectionKey<(optionValue: OptionProps['value']) => void>;

export const NSelectPickOptionInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'picker-option'),
) as InjectionKey<(value: OptionProps['value']) => void>;

export const NSelectVisibleOptionsInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'visible-options'),
) as InjectionKey<ComputedRef<SelectCollectedOptionData<'option'>[]>>;

export const NSelectFocusedOptionValueInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'focused-option-value'),
) as InjectionKey<Ref<OptionProps['value'] | undefined>>;

export const NSelectVirtualScrollListIsScrollingInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'virtual-scroll-list-is-scrolling'),
) as InjectionKey<Ref<boolean>>;

export const NSelectInputValueInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'input-value'),
) as InjectionKey<Ref<string>>;

export const NSelectFilterInputValueInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'filter-input-value'),
) as InjectionKey<Ref<string>>;

export const NSelectMouseOverOptionInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'mouse-over-option'),
) as InjectionKey<(value: OptionProps['value']) => void>;

export const NSelectHighlightContentRangesInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'highlight-content-ranges'),
) as InjectionKey<Ref<Map<OptionProps['value'], Range>>>;

export const NSelectHighlightDescriptionRangesInjectKey = Symbol.for(
  generatorInjectedKeyName('select', 'highlight-description-ranges'),
) as InjectionKey<Ref<Map<OptionProps['value'], Range>>>;
