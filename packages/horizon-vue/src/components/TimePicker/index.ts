import { default as TimePicker } from './src/TimePicker';
import { withInstall } from '@aurora/utils';

export const HTimePicker = withInstall(TimePicker);
export default HTimePicker;

export type {
  HTimePickerDisabledTimeMethodType,
  HTimePickerPanelOptionType,
  HTimePickerShowTimeTooltipType,
} from './src/utils/types';
