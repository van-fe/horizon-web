import type { FloatButtonShape, FloatButtonVariant } from '@aurora/core';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { InjectionKey, Ref } from 'vue';

export interface FloatButtonGroupContext {
  shape: Ref<FloatButtonShape | undefined>;
  type: Ref<FloatButtonVariant | undefined>;
  useCollapse: Ref<boolean>;
  visible: Ref<boolean>;
}

export const HFloatButtonGroupProps = Symbol(
  generatorInjectedKeyName('float-button-group', 'props'),
) as InjectionKey<FloatButtonGroupContext>;

export const HFloatButtonPassiveVisibleProps = Symbol(
  generatorInjectedKeyName('float-button', 'passive-visible'),
) as InjectionKey<Ref<boolean>>;
