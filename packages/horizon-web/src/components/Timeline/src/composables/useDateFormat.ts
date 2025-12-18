import type { LocaleSupportLang } from '@aurora/locale-vue';
import { LocaleSupportLang } from '@aurora/locale-vue';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/nb';

dayjs.extend(advancedFormat);

export function formatProp2DayjsParams(
  locale: LocaleSupportLang | LocaleSupportLang,
  date: Date,
  format: string,
) {
  /**
   * y+ -> Y+
   * m+ -> M+ ---- dayjs中m无用
   * d -> D
   * dd -> DD
   * h+ -> H+ ---- dayjs中h无用
   * i+ -> m+
   * s -> s
   * ss -> ss
   * ms -> SSS
   * t+ -> A+ ---- dayjs中A会有更细分凌晨、上午、中午……
   * w -> dddd
   * q -> Q ---- 1,2,3,4 -> ['第一季度', '第二季度', '第三季度', '第四季度'][Q - 1]
   */
  return format.replace(/y{1,4}|m{1,2}|d{1,4}|h{1,2}|i{1,2}|ms|t|w|q/g, match => {
    switch (match) {
      case 'y':
      case 'yy':
      case 'yyy':
      case 'yyyy':
      case 'm':
      case 'mm':
      case 'd':
      case 'dd':
      case 'h':
      case 'hh':
        return match.toUpperCase();
      case 'i':
        return 'm';
      case 'ii':
        return 'mm';
      case 'ms':
        return 'SSS';
      case 't':
        return 'A';
      case 'w':
        return 'dddd';
      case 'q':
        const quarter = Math.floor((date.getMonth() + 3) / 3);
        return locale === LocaleSupportLang.ZhCN
          ? ['[第一季度]', '[第二季度]', '[第三季度]', '[第四季度]'][quarter - 1]
          : ['[Q1]', '[Q2]', '[Q3]', '[Q4]'][quarter - 1];
      default:
        return match;
    }
  });
}

export const useDateFormative = (
  time: string | number | Date,
  format = 'mm/dd/yyyy',
  locale: LocaleSupportLang | LocaleSupportLang = LocaleSupportLang.ZhCN,
) => {
  if (
    !time ||
    (Object.prototype.toString.call(time) !== '[object Date]' &&
      typeof time !== 'string' &&
      typeof time !== 'number')
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

  const formatter = formatProp2DayjsParams(locale, date, format);
  return dayjs(date).locale(locale).format(formatter);
};

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
