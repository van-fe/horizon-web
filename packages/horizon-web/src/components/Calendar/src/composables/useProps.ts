import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { Dayjs } from 'dayjs';
import type { HCalendarPinFlag } from '../utils/types';

export const useCalendarProps = declarePropType({
  /**
   * 当前日历显示的日期
   * 既可以传入 `Date`，也可以是可以被 `dayjs` 解析的合法日期的字符串
   * 如果为空，则默认显示当前时间所在年/月/周
    * @en Configuration for model value.
   */
  modelValue: {
    type: [Date, String, Object] as PropType<Date | string | Dayjs>,
    required: false,
  },
  /**
   * 显示类型，默认为 'month'，如果 'month' 不在 `modeSwitchableList` 中，则取 `modeSwitchableList` 第一项
   * `month`: 月历
   * `week`: 周历
   * `year`: 年历
   * `day`: 日历
    * @en Configuration for mode.
   */
  mode: {
    type: String as PropType<'month' | 'year' | 'week' | 'day'>,
    default: 'month',
    validator(value: unknown): boolean {
      return typeof value === 'string' && ['month', 'year', 'week', 'day'].includes(value);
    },
  },
  /**
   * 是否允许切换显示类型
    * @en Configuration for mode switchable.
   */
  modeSwitchable: {
    type: Boolean,
    default: false,
  },
  /**
   * 允许切换显示类型的列表
    * @en Configuration for mode switchable list.
   */
  modeSwitchableList: {
    type: Array as PropType<Array<'year' | 'month' | 'week' | 'day'>>,
    default: () => ['year', 'month', 'week'],
    validator(value: unknown): boolean {
      return (
        Array.isArray(value) &&
        !value.some(curr => !['month', 'year', 'week', 'day'].includes(curr))
      );
    },
  },
  /**
   * 默认开始展示小时
   * 在 `mode` 为 `week` 或 `day` 时有效
    * @en Configuration for default start hour.
   */
  defaultStartHour: {
    type: Number,
    default: 8,
  },
  /**
   * 日期格式化，会影响回调的日期格式
    * @en Configuration for format.
   */
  format: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  /**
   * 日期显示方式
   * `full`: 全部展示（默认）
   * `only-current`: 仅显示当月日期，不显示上个月、下个月的日期
    * @en Configuration for date type.
   */
  dateType: {
    type: String as PropType<'full' | 'only-current'>,
    default: 'full',
  },
  /**
   * 禁用的日期，用于 `mode` 为 `year` 或 `month`
    * @en Configuration for disable date.
   */
  disableDate: {
    type: Function as PropType<(date: Dayjs) => boolean>,
    required: false,
  },
  /**
   * 禁用的小时的钩子，用于 `mode` 为 `week` 或 `day`
   * @param date 当天日期的0点开始（注意时区）
   * @paramEn date The date value.
   * @return {[Dayjs, Dayjs][]} 返回的禁用的时间的范围区间
    * @en Configuration for disable hours.
   */
  disableHours: {
    type: Function as PropType<(date: Dayjs) => Array<[Dayjs, Dayjs]>>,
    required: false,
  },
  /**
   * 周历和日历上，小时显示方式
    * @en Configuration for hour format.
   */
  hourFormat: {
    type: String as PropType<'24' | '12'>,
    default: '12',
  },
  /**
   * 是否允许选择日期或时间
    * @en Configuration for pickable.
   */
  pickable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许创建横幅
    * @en Configuration for enable create pin flags.
   */
  enableCreatePinFlags: {
    type: Boolean,
    default: false,
  },
  /**
   * 创建横幅时的回调
   * 需要返回 `title` 或 `type`
    * @en Configuration for creating pin flag callback.
   */
  creatingPinFlagCallback: {
    type: Function as PropType<
      (date: Dayjs) => {
        title?: string;
        type?: HCalendarPinFlag['type'];
      }
    >,
    required: false,
  },
  /**
   * 创建 Flag 的回调:
   * `false` 会删除 `Flag`
   * `true` 会保留临时创建的 `Flag`
   * `HCalendarPinFlag` 对象，会根据回调对象修改临时创建 `Flag` 的对象
    * @en Configuration for creat finish flag callback.
   */
  creatFinishFlagCallback: {
    type: Function as PropType<(flag: HCalendarPinFlag) => Promise<boolean | HCalendarPinFlag>>,
    required: false,
  },
  /**
   * 是否允许横幅创建时穿过不可用日期和时间
    * @en Configuration for create flag can though disable date or hour.
   */
  createFlagCanThoughDisableDateOrHour: {
    type: Boolean,
    default: true,
  },
  /**
   * 横幅内容
   * 一般可设置某些日期范围内的活动标识
   * 要注意时区问题
   * 会自动根据开始时间和结束时间排序
    * @en Configuration for pin flags.
   */
  pinFlags: {
    type: Array as PropType<HCalendarPinFlag[]>,
    default: () => [],
  },
  /**
   * 横幅是否展示时间，如果跨天则会附加展示日期
    * @en Configuration for pin flags show time.
   */
  pinFlagsShowTime: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否在两个紧接着的横幅中间留有空隙
   * 仅限 `mode` 为 `'week'` 和 `'day'`
    * @en Configuration for show spacing between flags.
   */
  showSpacingBetweenFlags: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否自动填满父容器
   * 不可用于 `mode` 为 `week` 和 `day`
    * @en Configuration for auto fit.
   */
  autoFit: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示当前时间的标线
   * 仅在 `mode` 为 `week` 和 `day` 时有效
    * @en Configuration for current time line.
   */
  currentTimeLine: {
    type: Boolean,
    default: true,
  },
});

export type CalendarProps = ExtractPropTypes<typeof useCalendarProps>;
