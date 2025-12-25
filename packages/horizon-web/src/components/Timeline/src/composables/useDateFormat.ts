import { LocaleSupportLang } from '@aurora/locale-vue';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/nb';

dayjs.extend(advancedFormat);

export const useDateFormative = (
  time: string | number | Date,
  format = 'mm/dd/yyyy',
  locale: LocaleSupportLang | LocaleSupportLang = LocaleSupportLang.ZhCN,
) => {
  if (
    Object.prototype.toString.call(time) !== '[object Date]' &&
    typeof time !== 'string' &&
    typeof time !== 'number'
  ) {
    console.warn('无效的时间参数');
    return time;
  }
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^\d+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/');
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }

  return dayjs(date).locale(locale).format(format);
};
