import { default as Calendar } from './src/Calendar';
import { withInstall } from '@aurora/utils';

export const NCalendar = withInstall(Calendar);
export default NCalendar;

export type { NCalendarPinFlag } from './src/utils/types';
