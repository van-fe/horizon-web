import { generatorInjectedKeyName } from '@aurora/utils';
import type { InjectionKey } from 'vue';
import type { PopoverProps } from '../composables/useProps';

export const HPickerPopoverPropsInjectKey = Symbol(
  generatorInjectedKeyName('popover', 'props'),
) as InjectionKey<PopoverProps>;
