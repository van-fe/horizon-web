import { default as Select } from './src/Select';
import Option from './src/Option';
import OptionGroup from './src/OptionGroup';
import { withInstall, withNoopInstall } from '@aurora/shared';

export const NSelect = withInstall(Select, {
  Option,
  OptionGroup,
});
export const NOption = withNoopInstall(Option);
export const NOptionGroup = withNoopInstall(OptionGroup);

export default NSelect;
