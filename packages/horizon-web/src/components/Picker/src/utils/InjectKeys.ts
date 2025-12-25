import type { HorizonWebComponentInstance, HorizonWebSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { InjectionKey, Ref } from 'vue';
import type { PickerProps, PickerInputStatusType, PickerStatusType } from '../composables/useProps';
import type { PickerEmits } from '../composables/useEmits';
import type { PickerSlots } from '../composables/useSlots';
import type NPopover from '~/components/Popover/src/Popover';
import type NPopContent from '~/components/Popover/src/PopContent';
import type { PopoverExposes } from '~/components/Popover/src/composables/useExposes';

export const NPickerPropsInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'props'),
) as InjectionKey<PickerProps>;

export const NPickerEmitsInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'emits'),
) as InjectionKey<HorizonWebSetupContext<PickerEmits>['emit']>;

export const NPickerSlotsInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'slots'),
) as InjectionKey<HorizonWebSetupContext<{}, PickerSlots>['slots']>;

export const NPickerPopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const NPickerStatusInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'status'),
) as InjectionKey<Ref<PickerStatusType>>;

export const NPickerInputStatusInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'input-status'),
) as InjectionKey<Ref<PickerInputStatusType>>;

export const NPickerDomRefInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'dom-ref'),
) as InjectionKey<Ref<null | HTMLElement>>;

export const NPickerPopoverDomRefInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'popover-dom-ref'),
) as InjectionKey<Ref<null | HorizonWebComponentInstance<typeof NPopover, PopoverExposes>>>;

export const NPickerPopContentDomRefInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'pop-content-dom-ref'),
) as InjectionKey<Ref<null | (InstanceType<typeof NPopContent> & HTMLElement)>>;
