import type { InjectionKey, Ref, SetupContext } from 'vue';
import type {
  BindComponent,
  FormProps,
  FormItemProps,
} from '~/components/Form/src/composables/useProps';
import type { LegoSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { FormEmits } from '../composables/useEmits';
import type { FormItemSlots } from '../composables/useSlots';

export type NFormItemTriggerType = (type: 'change' | 'blur') => void;

export const NFormItemErrorInjectedKey = Symbol.for('form-item-error') as InjectionKey<
  Ref<string | undefined>
>;

export const NFormItemTriggerInjectedKey = Symbol.for(
  generatorInjectedKeyName('form-item', 'validate-trigger'),
) as InjectionKey<NFormItemTriggerType | undefined>;

export const NFormInjectedKey = Symbol.for('form') as InjectionKey<
  FormProps & {
    bindValidate: (component: BindComponent) => void;
    unbindValidate: (uid?: number) => void;
    autoLabelWidth: string | number;
    setAutoLabelWidth: (width: number) => void;
    emit: SetupContext<FormEmits>['emit'];
  }
>;

export const NFormDisabledInjectedKey = Symbol.for(
  generatorInjectedKeyName('form-item', 'disabled'),
) as InjectionKey<Ref<boolean | undefined>>;

export const NFormItemPropsInjectedKey = Symbol.for(
  generatorInjectedKeyName('form-item', 'props'),
) as InjectionKey<FormItemProps>;

export const NFormItemSlotsInjectedKey = Symbol.for(
  generatorInjectedKeyName('form-item', 'slots'),
) as InjectionKey<LegoSetupContext<{}, FormItemSlots>['slots']>;
