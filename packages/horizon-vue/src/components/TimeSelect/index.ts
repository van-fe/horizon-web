import TimeSelect from './src/TimeSelect';
import { withInstall } from '@aurora/utils';

export const HTimeSelect = withInstall(TimeSelect);
export default HTimeSelect;

export type { TimeSelectModelValue, TimeSelectProps } from './src/composables/useProps';
export type { TimeSelectExposes } from './src/composables/useExposes';
export type { TimeSelectOption } from './src/utils/time';
