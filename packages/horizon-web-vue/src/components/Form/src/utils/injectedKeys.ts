import type { InjectionKey, Ref, SetupContext } from 'vue';
import type {
  BindComponent,
  FormProps,
  FormItemProps,
} from '~/components/Form/src/composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { FormEmits } from '../composables/useEmits';
import type { FormItemSlots } from '../composables/useSlots';

export type HFormItemTriggerType = (type: 'change' | 'blur') => void;

export const HFormItemErrorInjectedKey = Symbol.for('form-item-error') as InjectionKey<
  Ref<string | undefined>
>;

export const HFormItemTriggerInjectedKey = Symbol.for(
  generatorInjectedKeyName('form-item', 'validate-trigger'),
) as InjectionKey<HFormItemTriggerType | undefined>;

export const HFormInjectedKey = Symbol.for('form') as InjectionKey<
  FormProps & {
    bindValidate: (component: BindComponent) => void;
    unbindValidate: (uid?: number) => void;
    autoLabelWidth: string | number;
    setAutoLabelWidth: (width: number) => void;
    resolvedSize: 'medium' | 'large' | 'small';
    gridEnabled: boolean;
    emit: SetupContext<FormEmits>['emit'];
  }
>;

export const HFormDisabledInjectedKey = Symbol.for(
  generatorInjectedKeyName('form-item', 'disabled'),
) as InjectionKey<Ref<boolean | undefined>>;

export const HFormItemPropsInjectedKey = Symbol.for(
  generatorInjectedKeyName('form-item', 'props'),
) as InjectionKey<FormItemProps>;

export const HFormItemSlotsInjectedKey = Symbol.for(
  generatorInjectedKeyName('form-item', 'slots'),
) as InjectionKey<HorizonWebSetupContext<{}, FormItemSlots>['slots']>;
