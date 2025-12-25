import type { InjectionKey, Ref } from 'vue';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { FloatButtonGroupProps } from '../composables/useProps';

export const HFloatButtonGroupProps = Symbol(
  generatorInjectedKeyName('float-button-group', 'props'),
) as InjectionKey<FloatButtonGroupProps>;

export const HFloatButtonPassiveVisibleProps = Symbol(
  generatorInjectedKeyName('float-button', 'passive-visible'),
) as InjectionKey<Ref<boolean>>;
