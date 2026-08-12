import { isTimeValue, TIME_DEFAULTS } from '@aurora/core';
import type { TimeCommonProps, TimeValue } from '@aurora/core';
import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useTimeProps = declarePropType({
  /**
   * 时间（秒/毫秒级时间戳）
   * @en Configuration for time.
   */
  time: {
    type: [Date, Number, String] as PropType<TimeValue>,
    required: false,
    default: TIME_DEFAULTS.time,
    validator: isTimeValue,
  },
  /**
   * 到期时间（秒/毫秒级时间戳）
   * @en Configuration for end time.
   */
  endTime: {
    type: [Date, Number, String] as PropType<TimeValue>,
    required: false,
    default: TIME_DEFAULTS.endTime,
    validator: isTimeValue,
  },
  /**
   * 是否正向计时
   * @en Configuration for forward.
   */
  forward: {
    type: Boolean,
    required: false,
    default: TIME_DEFAULTS.forward,
  },
  /**
   * 是否计算time和endTime的差值
   * @en Configuration for calculative.
   */
  calculative: {
    type: Boolean,
    required: false,
    default: TIME_DEFAULTS.calculative,
  },
} satisfies Record<keyof TimeCommonProps, unknown>);

export type TimeProps = ExtractPropTypes<typeof useTimeProps>;
