import { default as Select } from './src/Select';
import Option from './src/Option';
import OptionGroup from './src/OptionGroup';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HSelect = withInstall(Select, {
  Option,
  OptionGroup,
});
export const HOption = withNoopInstall(Option);
export const HOptionGroup = withNoopInstall(OptionGroup);

export default HSelect;
