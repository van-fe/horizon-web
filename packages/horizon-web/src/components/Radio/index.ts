import { default as Radio } from './src/Radio';
import { default as RadioButton } from './src/RadioButton';
import { default as RadioGroup } from './src/RadioGroup';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const NRadio = withInstall(Radio, {
  RadioButton,
  RadioGroup,
});
export const NRadioButton = withNoopInstall(RadioButton);
export const NRadioGroup = withNoopInstall(RadioGroup);

export default NRadio;
