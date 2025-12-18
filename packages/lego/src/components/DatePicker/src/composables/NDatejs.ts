import type { PickerOptionsProps, PanelTimeType } from './useProps';
import dayjs from './dayjs';
import type { Dayjs } from 'dayjs';

class NDateJS {
  parseDayjsDate(date: any, format?: string | undefined): Dayjs {
    return this.isEmpty(format) ||
      format === 'timestamp' ||
      format === 'X' ||
      typeof date !== 'string'
      ? format === 'X' && typeof date === 'number'
        ? dayjs(date * 1000)
        : this.isEmpty(date)
          ? dayjs('')
          : dayjs(date)
      : dayjs(date, format);
  }
  isRange(current: Date, start: Date, end: Date) {
    if (current && start && end) {
      // 以00:00:00为一天的起始点 判断
      const startDate = this.setHoursMinutesSecondsMilliseconds(start);
      const endDate = this.setHoursMinutesSecondsMilliseconds(end);
      const r1 =
        dayjs(current).isBefore(dayjs(endDate)) && dayjs(current).isSameOrAfter(dayjs(startDate));
      const r2 =
        dayjs(current).isBefore(dayjs(startDate)) && dayjs(current).isSameOrAfter(dayjs(endDate));

      return r1 || r2;
    }
    return false;
  }
  isBeforeTime(
    t1: { hours: number; minutes: number; seconds: number },
    t2: { hours: number; minutes: number; seconds: number },
  ) {
    if (t1.hours < t2.hours) {
      return true;
    }
    if (t1.hours === t2.hours && t1.minutes < t2.minutes) {
      return true;
    }
    if (t1.hours === t2.hours && t1.minutes === t2.minutes && t1.seconds < t2.seconds) {
      return true;
    }
    return false;
  }
  isValidTime(time: string) {
    const result = time.split(':');

    return result.length >= 2;
  }
  getHoursMinutesSeconds(time: string) {
    let panelTime: PanelTimeType = {};
    if (this.isValidTime(time)) {
      const result = time.split(':');
      const [hours, minutes, seconds] = result.map(item => parseInt(item, 10));

      panelTime = {
        hours,
        minutes,
        seconds,
      };
    }
    return panelTime;
  }
  parseTodayDateTime(time: string) {
    if (!time) {
      return time;
    }
    const { hours, minutes, seconds } = this.getHoursMinutesSeconds(time);

    return dayjs()
      .hour(hours || 0)
      .minute(minutes || 0)
      .second(seconds || 0)
      .millisecond(0)
      .toDate();
  }
  compareDate(time1: any, time2: any) {
    return dayjs(time1).valueOf() - dayjs(time2).valueOf();
  }
  compareTime(time1: string, time2: string) {
    const t1 = this.getHoursMinutesSeconds(time1);
    const t2 = this.getHoursMinutesSeconds(time2);
    if (
      typeof t1.hours !== 'undefined' &&
      typeof t1.minutes !== 'undefined' &&
      typeof t2.hours !== 'undefined' &&
      typeof t2.minutes !== 'undefined'
    ) {
      const seconds1 = t1.hours * 60 * 60 + t1.minutes * 60 + (t1?.seconds || 0);
      const seconds2 = t2.hours * 60 * 60 + t2.minutes * 60 + (t2?.seconds || 0);

      return seconds1 - seconds2;
    }
    return 0;
  }
  formatTime({ hours, minutes, seconds }: PanelTimeType, format = 'HH:mm:ss') {
    const result = `${hours ? this.padStart(hours) : '00'}:${
      minutes ? this.padStart(minutes) : '00'
    }`;

    if (format === 'HH:mm:ss') {
      return result + `:${seconds ? this.padStart(seconds) : '00'}`;
    }
    return result;
  }
  stepTime(current: string, step: string) {
    const currentHMS = this.getHoursMinutesSeconds(current);
    const stepHMS = this.getHoursMinutesSeconds(step);
    if (
      typeof currentHMS.hours !== 'undefined' &&
      typeof currentHMS.minutes !== 'undefined' &&
      typeof stepHMS.hours !== 'undefined' &&
      typeof stepHMS.minutes !== 'undefined'
    ) {
      let hours = currentHMS.hours + stepHMS.hours;
      let minutes = currentHMS.minutes + stepHMS.minutes;
      let seconds = 0;
      let format = 'HH:mm';
      if (typeof currentHMS.seconds !== 'undefined' && typeof stepHMS.seconds !== 'undefined') {
        seconds = currentHMS.seconds + stepHMS.seconds;
        format = 'HH:mm:ss';
      }

      minutes += Math.floor(seconds / 60);
      hours += Math.floor(minutes / 60);
      minutes = minutes % 60;
      seconds = seconds % 60;
      return this.formatTime({ hours, minutes, seconds }, format);
    }
    return '';
  }
  padStart(time: number, num = 2, m = '0') {
    return `${time}`.padStart(num, m);
  }
  getUUID(randomLen = 5) {
    return Number(Math.random().toString().substr(2, randomLen) + Date.now()).toString(36);
  }
  getApproximateMilliseconds(current: string, step: string) {
    const currentHMS = this.getHoursMinutesSeconds(current);
    const stepHMS = this.getHoursMinutesSeconds(step);
    if (
      typeof currentHMS.hours !== 'undefined' &&
      typeof currentHMS.minutes !== 'undefined' &&
      typeof stepHMS.hours !== 'undefined' &&
      typeof stepHMS.minutes !== 'undefined'
    ) {
      const currentSeconds =
        currentHMS.hours * 60 * 60 + currentHMS.minutes * 60 + (currentHMS.seconds || 0);
      const stepSeconds = stepHMS.hours * 60 * 60 + stepHMS.minutes * 60 + (stepHMS.seconds || 0);
      const scale = Math.ceil(currentSeconds / stepSeconds);

      return scale * stepSeconds * 1000;
    }
    return 0;
  }
  getApproximateStepValue(current: number, step: number) {
    if (current >= 0 && step >= 1) {
      const scale = Math.ceil(current / step);

      return scale * step;
    }
    return 0;
  }
  handleApproximateDateTime(
    today: Date,
    timePickerType: string,
    DATE_FORMATS_DEFAULT: string,
    timeDefaultFormat: string,
    pickerOptions: PickerOptionsProps,
  ) {
    // const today  = dayjs([2022, 4, 7, 23, 58, 3]); //test
    const now = dayjs(today);
    const parseDateString = dayjs(today).format(DATE_FORMATS_DEFAULT);
    const parseTimeString = dayjs(today).format(timeDefaultFormat);

    let step = pickerOptions.step;
    let start = pickerOptions.start;
    let end = pickerOptions.end;
    const minutesStep = parseInt(String(pickerOptions.minutesStep)) || 1;
    const secondsStep = parseInt(String(pickerOptions.secondsStep)) || 1;

    let multiSystemStep;
    let dateTimeMilliseconds;

    if (timePickerType === 'time') {
      dateTimeMilliseconds =
        dayjs(parseDateString).valueOf() +
        this.getApproximateMilliseconds(parseTimeString as string, step);
    }

    if (timePickerType === 'minutes') {
      step = this.formatTime(
        {
          hours: 0,
          minutes: minutesStep,
          seconds: 0,
        },
        timeDefaultFormat,
      );
      start = this.formatTime(
        {
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        timeDefaultFormat,
      );
      end = this.formatTime(
        {
          hours: 23,
          minutes: 60 - minutesStep > 0 ? 60 - minutesStep : 59,
          seconds: 0,
        },
        timeDefaultFormat,
      );

      const approximateMinutes = this.getApproximateStepValue(today.getMinutes(), minutesStep);
      today.setMinutes(approximateMinutes);
      dateTimeMilliseconds = dayjs(today).valueOf();
    }
    if (timePickerType === 'seconds') {
      multiSystemStep = {
        minutesStep: this.formatTime(
          {
            hours: 0,
            minutes: minutesStep - 1, //60进制会多1
            seconds: 0,
          },
          timeDefaultFormat,
        ),
        secondsStep: this.formatTime(
          {
            hours: 0,
            minutes: 0,
            seconds: secondsStep,
          },
          timeDefaultFormat,
        ),
      };
      step = multiSystemStep.secondsStep;
      start = this.formatTime(
        {
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        timeDefaultFormat,
      );
      end = this.formatTime(
        {
          hours: 23,
          minutes: 60 - minutesStep > 0 ? 60 - minutesStep : 59,
          seconds: 60 - secondsStep > 0 ? 60 - secondsStep : 59,
        },
        timeDefaultFormat,
      );

      const approximateSeconds = this.getApproximateStepValue(today.getSeconds(), secondsStep);
      today.setSeconds(approximateSeconds >= 60 ? 60 : approximateSeconds);
      const prev = today.getMinutes();
      const approximateMinutes = this.getApproximateStepValue(today.getMinutes(), minutesStep);
      today.setMinutes(approximateMinutes >= 60 ? 60 : approximateMinutes);
      // reset seconds 0
      if (approximateMinutes > prev) {
        today.setSeconds(0);
      }
      dateTimeMilliseconds = dayjs(today).valueOf();
    }
    const mergeDateTime = dayjs(dateTimeMilliseconds);
    //接近时间不是当天，返回
    if (mergeDateTime.date() !== now.date()) {
      return;
    }
    const currentApproximateTime = mergeDateTime.format(timeDefaultFormat);
    let current = currentApproximateTime;
    // 范围内
    while (
      this.compareTime(current as string, start) < 0 ||
      this.compareTime(current as string, end) > 0
    ) {
      if (timePickerType === 'seconds') {
        // 秒的进制可能不一致
        // 下一次步进秒
        const nextCurrentSeconds =
          (this.getHoursMinutesSeconds(current as string).seconds || 0) +
          (this.getHoursMinutesSeconds(multiSystemStep?.secondsStep as string).seconds || 0);
        step = multiSystemStep?.secondsStep as string;
        if (nextCurrentSeconds >= 60) {
          step = this.stepTime(
            multiSystemStep?.minutesStep as string,
            multiSystemStep?.secondsStep as string,
          );
        }
      }
      current = this.stepTime(current as string, step);

      if (this.compareTime(current as string, end) >= 0) {
        // 当天不满足时
        return;
      }
    }
    return dayjs(`${parseDateString} ${current}`).toDate();
  }
  /* 默认设置00:00:00:000 */
  setHoursMinutesSecondsMilliseconds(currentDate: Date, mergeTime?: any) {
    const date = dayjs(currentDate);
    let dateObject: PanelTimeType = {};
    if (typeof mergeTime === 'string') {
      dateObject = this.getHoursMinutesSeconds(mergeTime);
    } else {
      dateObject = (mergeTime && dayjs(mergeTime).isValid() && dayjs(mergeTime).toObject()) || {};
    }

    return date
      .hour(dateObject.hours || 0)
      .minute(dateObject.minutes || 0)
      .second(dateObject.seconds || 0)
      .millisecond(dateObject.milliseconds || 0)
      .toDate();
  }
  isEmpty(value: any) {
    return value === '' || value === null || typeof value === 'undefined';
  }
  dayjsToObject(result: any) {
    return this.handleDateObject(dayjs(result).toObject());
  }
  handleDateObject(dateObject: Partial<PanelTimeType>): Partial<PanelTimeType> {
    const result = {};
    for (const [k, v] of Object.entries(dateObject)) {
      Reflect.set(result, k, v);
      if (Object.is(v, NaN)) {
        Reflect.set(result, k, undefined);
      }
    }
    return result;
  }
  getHoursMinutesSecondsObject(value: any, isNeedNextDay = false) {
    if (!dayjs(value).isValid() && typeof value === 'string') {
      value = this.parseTodayDateTime(value);
    }
    // 判断是否是下一天 只支持到次日
    const isNextDay = isNeedNextDay && dayjs(value).isAfter(dayjs().endOf('day'));
    const { hours, minutes, seconds } = this.handleDateObject(dayjs(value).toObject());

    return {
      hours: isNextDay ? (hours || 0) + 24 : hours,
      minutes,
      seconds,
    };
  }
}

export type NDatejsType = NDateJS;
export const NDatejs = new NDateJS();
