import type { LegoSetupContext } from '@nio-fe/shared';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { TimePickerV2Props } from '../composables/useProps';
import type { TimePickerV2Emits } from '../composables/useEmits';
import type { TimePickerV2Slots } from '../composables/useSlots';

export const NTimePickerV2PropsInjectKey = Symbol(
  generatorInjectedKeyName('timePickerV2', 'props'),
) as InjectionKey<TimePickerV2Props>;

export const NTimePickerV2EmitsInjectKey = Symbol(
  generatorInjectedKeyName('timePickerV2', 'emits'),
) as InjectionKey<LegoSetupContext<TimePickerV2Emits>['emit']>;

export const NTimePickerV2SlotsInjectKey = Symbol(
  generatorInjectedKeyName('timePickerV2', 'slots'),
) as InjectionKey<LegoSetupContext<{}, TimePickerV2Slots>['slots']>;

export const NTimePickerV2PopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('timePickerV2', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const NTimePickerV2InputStringInjectKey = Symbol(
  generatorInjectedKeyName('timePickerV2', 'input-string'),
) as InjectionKey<ComputedRef<string>>;

export const NTimePickerV2PanelVisibleInjectKey = Symbol(
  generatorInjectedKeyName('timePickerV2', 'panel-visible'),
) as InjectionKey<Ref<boolean>>;
