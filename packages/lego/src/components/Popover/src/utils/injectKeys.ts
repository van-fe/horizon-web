import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { InjectionKey } from 'vue';
import type { PopoverProps } from '../composables/useProps';

export const NPickerPopoverPropsInjectKey = Symbol(
  generatorInjectedKeyName('popover', 'props'),
) as InjectionKey<PopoverProps>;
