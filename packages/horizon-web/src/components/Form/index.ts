import { default as Form } from './src/Form';
import { default as FormItem } from './src/FormItem';
import { withInstall, withNoopInstall } from '@aurora/shared';
import type { NFormInstance, NFormRule, NFormItemHelper } from './src/composables/useProps';
export {
  NFormItemErrorInjectedKey,
  NFormInjectedKey,
  NFormItemTriggerInjectedKey,
  NFormDisabledInjectedKey,
  NFormItemPropsInjectedKey,
  NFormItemSlotsInjectedKey,
} from './src/utils/injectedKeys';

export const NForm = withInstall(Form, { FormItem });
export const NFormItem = withNoopInstall(FormItem);

export default NForm;

export type { NFormInstance, NFormRule, NFormItemHelper };
