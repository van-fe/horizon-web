import { default as Calendar } from './src/Calendar';
import { withInstall } from '@aurora/utils';

export const HCalendar = withInstall(Calendar);
export default HCalendar;

export type { HCalendarPinFlag } from './src/utils/types';
