import { shallowMount } from '@vue/test-utils';
import HTimeline from '../src/Timeline';
import { describe, expect, test } from 'vitest';

import { useDateFormative } from '../src/composables/useDateFormat';

describe('Timeline.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HTimeline />);
    const element = wrapper.findComponent(HTimeline);

    expect(element.exists()).toBe(true);
  });

  test('formatProp2DayjsParams is compatibility', async () => {
    const oldDateFormative = (time: string | number | Date, format = 'mm/dd/yyyy') => {
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
      const formatObj: { [x: string]: number } = {
        y: date.getFullYear(), // 年
        m: date.getMonth() + 1, // 月
        d: date.getDate(), // 天
        h: date.getHours(), // 时
        i: date.getMinutes(), // 分
        s: date.getSeconds(), // 秒
        ms: date.getMilliseconds(), // 毫秒
        t: +!!(date.getHours() - 12 > 0), // 上下午
        w: date.getDay(), // 星期
        q: Math.floor((date.getMonth() + 3) / 3), // 季度
      };
      const time_str = format.replace(
        /(y)+|(m)+|(d)+|(h)+|(i)+|(s)+|(ms)+|(t)+|(w)+|(q)+/g,
        (match, ...args) => {
          const key = args.filter(arg => (arg ? true : false))[0];
          const value = formatObj[key];
          if (key === 'w') {
            return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][value];
          }
          if (key === 'q') {
            return ['第一季度', '第二季度', '第三季度', '第四季度'][value - 1];
          }
          if (key === 't') {
            return ['上午', '下午'][value];
          }
          let zero = '';
          for (let i = 0; i < match.length; i++) {
            zero += '0';
          }
          const matchValue =
            match.length === 1 ? `${value}` : (zero + value).substring(('' + value).length);
          return matchValue || '0';
        },
      );
      return time_str;
    };
    const date = new Date();
    const oldStr = oldDateFormative(date, 'yyyy-mm-dd hh:ii:ss q');
    const newStr = useDateFormative(date, 'yyyy-mm-dd hh:ii:ss q');
    expect(oldStr).equal(newStr);
  });
});
