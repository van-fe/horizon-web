import { default as TimePickerV2 } from './src/TimePickerV2';
import { withInstall } from '@nio-fe/shared';

export const NTimePickerV2 = withInstall(TimePickerV2);
export default NTimePickerV2;

export type {
  NTimePickerV2DisabledTimeMethodType,
  NTimePickerPanelOptionType,
  NTimePickerV2ShowTimeTooltipType,
} from './src/utils/types';
