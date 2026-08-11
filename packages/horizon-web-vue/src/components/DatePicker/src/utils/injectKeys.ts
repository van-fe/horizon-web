import type { HorizonWebSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { DatePickerProps } from '../composables/useProps';
import type { DatePickerEmits } from '../composables/useEmits';
import type { DatePickerSlots } from '../composables/useSlots';
import type valueFormatJson from '~/locales/dateFormat.json';
import type dateSwitcherShowFormatJson from './dateSwitcherShowFormat.json';
import type { LocaleSupportLang } from '@aurora/locale';
import type { HDatePickerBaseSupportType } from './types';

export const HDatePickerPropsInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'props'),
) as InjectionKey<DatePickerProps>;

export const HDatePickerEmitsInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'emits'),
) as InjectionKey<HorizonWebSetupContext<DatePickerEmits>['emit']>;

export const HDatePickerSlotsInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'slots'),
) as InjectionKey<HorizonWebSetupContext<{}, DatePickerSlots>['slots']>;

export const HDatePickerPopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const HDatePickerInputStringInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'input-string'),
) as InjectionKey<ComputedRef<string>>;

export const HDatePickerPanelVisibleInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'panel-visible'),
) as InjectionKey<Ref<boolean>>;

export const HDatePickerValueFormatMappingInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'value-format-mapping'),
) as InjectionKey<ComputedRef<(typeof valueFormatJson)[LocaleSupportLang.En]>>;

export const HDatePickerDateSwitcherShowFormatMappingMappingInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'value-format-mapping'),
) as InjectionKey<ComputedRef<(typeof dateSwitcherShowFormatJson)[LocaleSupportLang.En]>>;

export const HDatePickerFormatInjectKey = Symbol(
  generatorInjectedKeyName('datePicker', 'format'),
) as InjectionKey<ComputedRef<HDatePickerBaseSupportType>>;
