import type { ComputedRef, InjectionKey } from 'vue';
import type { ButtonGroupProps } from '../composables/useProps';
import { generatorInjectedKeyName } from '@nio-fe/shared';

export const NButtonGroupPropsInjectKey = Symbol(
  generatorInjectedKeyName('button-group', 'props'),
) as InjectionKey<ButtonGroupProps>;

export const NButtonGroupSizeInjectKey = Symbol(
  generatorInjectedKeyName('button-group', 'size'),
) as InjectionKey<ComputedRef<Exclude<ButtonGroupProps['size'], undefined>>>;
