import { default as Checkbox } from './src/Checkbox';
import { default as CheckboxButton } from './src/CheckboxButton';
import { default as CheckboxGroup } from './src/CheckboxGroup';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const NCheckbox = withInstall(Checkbox, { CheckboxButton, CheckboxGroup });

export default NCheckbox;

export const NCheckboxButton = withNoopInstall(CheckboxButton);
export const NCheckboxGroup = withNoopInstall(CheckboxGroup);
