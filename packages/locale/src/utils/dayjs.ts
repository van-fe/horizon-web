import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import AELocale from './dayjs.ae.locale';

import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/nb';
import 'dayjs/locale/de';
dayjs.locale('ae', AELocale);

dayjs.extend(advancedFormat);

export default dayjs;
