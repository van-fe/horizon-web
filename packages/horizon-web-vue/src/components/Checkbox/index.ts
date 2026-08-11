import { default as Checkbox } from './src/Checkbox';
import { default as CheckboxButton } from './src/CheckboxButton';
import { default as CheckboxGroup } from './src/CheckboxGroup';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HCheckbox = withInstall(Checkbox, { CheckboxButton, CheckboxGroup });

export default HCheckbox;

export const HCheckboxButton = withNoopInstall(CheckboxButton);
export const HCheckboxGroup = withNoopInstall(CheckboxGroup);
