import dayjs from 'dayjs';

/** 使用 Web 日期格式能力生成 TimeSelect 展示文字。@en Formats a TimeSelect label with Web date formatting. */
export function formatTimeSelectLabel(minutes: number, format = 'HH:mm'): string {
  return dayjs().startOf('day').add(minutes, 'minute').format(format);
}
