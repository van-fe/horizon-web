import type { HorizonWebSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { TimePickerProps } from '../composables/useProps';
import type { TimePickerEmits } from '../composables/useEmits';
import type { TimePickerSlots } from '../composables/useSlots';

export const HTimePickerPropsInjectKey = Symbol(
  generatorInjectedKeyName('timePicker', 'props'),
) as InjectionKey<TimePickerProps>;

export const HTimePickerEmitsInjectKey = Symbol(
  generatorInjectedKeyName('timePicker', 'emits'),
) as InjectionKey<HorizonWebSetupContext<TimePickerEmits>['emit']>;

export const HTimePickerSlotsInjectKey = Symbol(
  generatorInjectedKeyName('timePicker', 'slots'),
) as InjectionKey<HorizonWebSetupContext<{}, TimePickerSlots>['slots']>;

export const HTimePickerPopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('timePicker', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const HTimePickerInputStringInjectKey = Symbol(
  generatorInjectedKeyName('timePicker', 'input-string'),
) as InjectionKey<ComputedRef<string>>;

export const HTimePickerPanelVisibleInjectKey = Symbol(
  generatorInjectedKeyName('timePicker', 'panel-visible'),
) as InjectionKey<Ref<boolean>>;
