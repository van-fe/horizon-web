import { default as Radio } from './src/Radio';
import { default as RadioButton } from './src/RadioButton';
import { default as RadioGroup } from './src/RadioGroup';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HRadio = withInstall(Radio, {
  RadioButton,
  RadioGroup,
});
export const HRadioButton = withNoopInstall(RadioButton);
export const HRadioGroup = withNoopInstall(RadioGroup);

export default HRadio;
