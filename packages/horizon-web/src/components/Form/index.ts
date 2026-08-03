import { default as Form } from './src/Form';
import { default as FormItem } from './src/FormItem';
import { withInstall, withNoopInstall } from '@aurora/utils';
import type { HFormInstance, HFormRule, HFormItemHelper } from './src/composables/useProps';
export {
  HFormItemErrorInjectedKey,
  HFormInjectedKey,
  HFormItemTriggerInjectedKey,
  HFormDisabledInjectedKey,
  HFormItemPropsInjectedKey,
  HFormItemSlotsInjectedKey,
} from './src/utils/injectedKeys';

export const HForm = withInstall(Form, { FormItem });
export const HFormItem = withNoopInstall(FormItem);

export default HForm;

export type { HFormInstance, HFormRule, HFormItemHelper };
