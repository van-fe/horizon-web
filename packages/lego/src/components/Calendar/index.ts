import { default as Calendar } from './src/Calendar';
import { withInstall } from '@nio-fe/shared';

export const NCalendar = withInstall(Calendar);
export default NCalendar;

export type { NCalendarPinFlag } from './src/utils/types';
