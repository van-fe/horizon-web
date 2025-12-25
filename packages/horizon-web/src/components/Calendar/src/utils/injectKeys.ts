import type { InjectionKey, Ref, SetupContext, WritableComputedRef } from 'vue';
import type { Dayjs } from 'dayjs';
import type { CalendarProps } from '../composables/useProps';
import type { CalendarEmits } from '../composables/useEmits';
import type PinFlagsHelper from './PinFlagsHelper';
import { generatorInjectedKeyName } from '@aurora/utils';
import type CalendarHelper from './CalendarHelper';
import type { CalendarSlots } from '../composables/useSlots';

export const HCalendarPropsInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'props'),
) as InjectionKey<CalendarProps>;

export const HCalendarEmitInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'emit'),
) as InjectionKey<SetupContext<CalendarEmits>['emit']>;

export const HCalendarSlotsInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'slots'),
) as InjectionKey<Partial<SetupContext<{}, CalendarSlots>['slots']>>;

export const HCalendarPinFlagsInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'pin-flags'),
) as InjectionKey<PinFlagsHelper>;

export const HCalendarCurrentDateInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'current-date'),
) as InjectionKey<Ref<Dayjs>>;

export const HCalendarCurrentFormatDateInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'current-format-date'),
) as InjectionKey<WritableComputedRef<string>>;

export const HCalendarHelperInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'helper'),
) as InjectionKey<CalendarHelper>;

export const HCalendarCurrentTimeInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'current-time'),
) as InjectionKey<Ref<Dayjs>>;
