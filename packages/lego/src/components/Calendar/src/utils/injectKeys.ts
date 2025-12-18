import type { InjectionKey, Ref, SetupContext, WritableComputedRef } from 'vue';
import type { Dayjs } from 'dayjs';
import type { CalendarProps } from '../composables/useProps';
import type { CalendarEmits } from '../composables/useEmits';
import type PinFlagsHelper from './PinFlagsHelper';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type CalendarHelper from './CalendarHelper';
import type { CalendarSlots } from '../composables/useSlots';

export const NCalendarPropsInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'props'),
) as InjectionKey<CalendarProps>;

export const NCalendarEmitInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'emit'),
) as InjectionKey<SetupContext<CalendarEmits>['emit']>;

export const NCalendarSlotsInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'slots'),
) as InjectionKey<Partial<SetupContext<{}, CalendarSlots>['slots']>>;

export const NCalendarPinFlagsInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'pin-flags'),
) as InjectionKey<PinFlagsHelper>;

export const NCalendarCurrentDateInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'current-date'),
) as InjectionKey<Ref<Dayjs>>;

export const NCalendarCurrentFormatDateInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'current-format-date'),
) as InjectionKey<WritableComputedRef<string>>;

export const NCalendarHelperInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'helper'),
) as InjectionKey<CalendarHelper>;

export const NCalendarCurrentTimeInjectKey = Symbol(
  generatorInjectedKeyName('calendar', 'current-time'),
) as InjectionKey<Ref<Dayjs>>;
