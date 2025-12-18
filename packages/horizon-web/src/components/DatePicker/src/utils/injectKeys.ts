import type { LegoSetupContext } from '@aurora/shared';
import { generatorInjectedKeyName } from '@aurora/shared';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { DatePickerProps } from '../composables/useProps';
import type { DatePickerEmits } from '../composables/useEmits';
import type { DatePickerSlots } from '../composables/useSlots';
import type valueFormatJson from '~/locales/dateFormat.json';
import type dateSwitcherShowFormatJson from './dateSwitcherShowFormat.json';
import type { LocaleSupportLang } from '@aurora/locale';
import type { NDatePickerBaseSupportType } from './types';

export const NDatePickerPropsInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'props'),
) as InjectionKey<DatePickerProps>;

export const NDatePickerEmitsInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'emits'),
) as InjectionKey<LegoSetupContext<DatePickerEmits>['emit']>;

export const NDatePickerSlotsInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'slots'),
) as InjectionKey<LegoSetupContext<{}, DatePickerSlots>['slots']>;

export const NDatePickerPopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const NDatePickerInputStringInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'input-string'),
) as InjectionKey<ComputedRef<string>>;

export const NDatePickerPanelVisibleInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'panel-visible'),
) as InjectionKey<Ref<boolean>>;

export const NDatePickerValueFormatMappingInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'value-format-mapping'),
) as InjectionKey<ComputedRef<(typeof valueFormatJson)[LocaleSupportLang.En]>>;

export const NDatePickerDateSwitcherShowFormatMappingMappingInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'value-format-mapping'),
) as InjectionKey<ComputedRef<(typeof dateSwitcherShowFormatJson)[LocaleSupportLang.En]>>;

export const NDatePickerFormatInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'format'),
) as InjectionKey<ComputedRef<NDatePickerBaseSupportType>>;
