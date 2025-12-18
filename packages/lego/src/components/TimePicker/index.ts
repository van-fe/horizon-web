import { default as TimePicker } from './src/TimePicker';
import { withInstall } from '@nio-fe/shared';

export const NTimePicker = withInstall(TimePicker);
export default NTimePicker;

export type {
  NTimePickerDisabledTimeMethodType,
  NTimePickerPanelOptionType,
  NTimePickerShowTimeTooltipType,
} from './src/utils/types';
