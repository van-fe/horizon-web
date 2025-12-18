import type { LegoSetupContext } from '@nio-fe/shared';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { DatePickerV2Props } from '../composables/useProps';
import type { DatePickerV2Emits } from '../composables/useEmits';
import type { DatePickerV2Slots } from '../composables/useSlots';
import type valueFormatJson from '~/locales/dateFormat.json';
import type dateSwitcherShowFormatJson from '../utils/dateSwitcherShowFormat.json';
import type { LocaleSupportLangV2 } from '@nio-fe/locale';
import type { NDatePickerV2BaseSupportType } from '../utils/types';

export const NDatePickerV2PropsInjectKey = Symbol(
  generatorInjectedKeyName('datePickerV2', 'props'),
) as InjectionKey<DatePickerV2Props>;

export const NDatePickerV2EmitsInjectKey = Symbol(
  generatorInjectedKeyName('datePickerV2', 'emits'),
) as InjectionKey<LegoSetupContext<DatePickerV2Emits>['emit']>;

export const NDatePickerV2SlotsInjectKey = Symbol(
  generatorInjectedKeyName('datePickerV2', 'slots'),
) as InjectionKey<LegoSetupContext<{}, DatePickerV2Slots>['slots']>;

export const NDatePickerV2PopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('datePickerV2', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const NDatePickerV2InputStringInjectKey = Symbol(
  generatorInjectedKeyName('datePickerV2', 'input-string'),
) as InjectionKey<ComputedRef<string>>;

export const NDatePickerV2PanelVisibleInjectKey = Symbol(
  generatorInjectedKeyName('datePickerV2', 'panel-visible'),
) as InjectionKey<Ref<boolean>>;

export const NDatePickerV2ValueFormatMappingInjectKey = Symbol(
  generatorInjectedKeyName('datePickerV2', 'value-format-mapping'),
) as InjectionKey<ComputedRef<(typeof valueFormatJson)[LocaleSupportLangV2.En]>>;

export const NDatePickerV2DateSwitcherShowFormatMappingMappingInjectKey = Symbol(
  generatorInjectedKeyName('datePickerV2', 'value-format-mapping'),
) as InjectionKey<ComputedRef<(typeof dateSwitcherShowFormatJson)[LocaleSupportLangV2.En]>>;

export const NDatePickerV2FormatInjectKey = Symbol(
  generatorInjectedKeyName('datePickerV2', 'format'),
) as InjectionKey<ComputedRef<NDatePickerV2BaseSupportType>>;
