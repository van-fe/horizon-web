import type { HorizonWebComponentInstance, HorizonWebSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { InjectionKey, Ref } from 'vue';
import type { PickerProps, PickerInputStatusType, PickerStatusType } from '../composables/useProps';
import type { PickerEmits } from '../composables/useEmits';
import type { PickerSlots } from '../composables/useSlots';
import type HPopover from '~/components/Popover/src/Popover';
import type HPopContent from '~/components/Popover/src/PopContent';
import type { PopoverExposes } from '~/components/Popover/src/composables/useExposes';

export const HPickerPropsInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'props'),
) as InjectionKey<PickerProps>;

export const HPickerEmitsInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'emits'),
) as InjectionKey<HorizonWebSetupContext<PickerEmits>['emit']>;

export const HPickerSlotsInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'slots'),
) as InjectionKey<HorizonWebSetupContext<{}, PickerSlots>['slots']>;

export const HPickerPopperVisibleInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'popper-visible'),
) as InjectionKey<Ref<boolean>>;

export const HPickerStatusInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'status'),
) as InjectionKey<Ref<PickerStatusType>>;

export const HPickerInputStatusInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'input-status'),
) as InjectionKey<Ref<PickerInputStatusType>>;

export const HPickerDomRefInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'dom-ref'),
) as InjectionKey<Ref<null | HTMLElement>>;

export const HPickerPopoverDomRefInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'popover-dom-ref'),
) as InjectionKey<Ref<null | HorizonWebComponentInstance<typeof HPopover, PopoverExposes>>>;

export const HPickerPopContentDomRefInjectKey = Symbol(
  generatorInjectedKeyName('picker', 'pop-content-dom-ref'),
) as InjectionKey<Ref<null | (InstanceType<typeof HPopContent> & HTMLElement)>>;
