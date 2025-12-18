import { default as Calendar } from './src/Calendar';
import { withInstall } from '@aurora/shared';

export const NCalendar = withInstall(Calendar);
export default NCalendar;

export type { NCalendarPinFlag } from './src/utils/types';
