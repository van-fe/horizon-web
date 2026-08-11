import { LocaleSupportLang } from '@aurora/locale-vue';
import { formatTimelineTimestamp } from '@aurora/horizon-web-core';

export const useDateFormative = (
  time: unknown,
  format = 'mm/dd/yyyy',
  locale: LocaleSupportLang | LocaleSupportLang = LocaleSupportLang.ZhCN,
) => {
  const formatted = formatTimelineTimestamp(time, { format, locale });
  if (formatted === undefined) {
    console.warn('无效的时间参数');
    return time;
  }
  return formatted;
};
