import type { LegoSetupContext } from '@nio-fe/shared';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { TimePickerProps } from '../composables/useProps';
import type { TimePickerEmits } from '../composables/useEmits';
import type { TimePickerSlots } from '../composables/useSlots';

export const NTimePickerPropsInjectKey = Symbol(
  generatorInjectedKeyName('timePicker', 'props'),
) as InjectionKey<TimePickerProps>;

export const NTimePickerEmitsInjectKey = Symbol(
  generatorInjectedKeyName('timePicker', 'emits'),
) as InjectionKey<LegoSetupContext<TimePickerEmits>['emit']>;

export const NTimePickerSlotsInjectKey = Symbol(
  generatorInjectedKeyName('timePicker', 'slots'),
) as InjectionKey<LegoSetupContext<{}, TimePickerSlots>['slots']>;

export const NTimePickerPopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('timePicker', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const NTimePickerInputStringInjectKey = Symbol(
  generatorInjectedKeyName('timePicker', 'input-string'),
) as InjectionKey<ComputedRef<string>>;

export const NTimePickerPanelVisibleInjectKey = Symbol(
  generatorInjectedKeyName('timePicker', 'panel-visible'),
) as InjectionKey<Ref<boolean>>;
