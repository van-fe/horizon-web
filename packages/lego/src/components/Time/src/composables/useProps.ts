import type { ExtractPropTypes } from 'vue';
import { declarePropType } from '@nio-fe/shared';

export const useTimeProps = declarePropType({
  /**
   * 时间（秒/毫秒级时间戳）
   */
  time: {
    type: [Date, Number, String],
    required: false,
    default: 10,
  },
  /**
   * 到期时间（秒/毫秒级时间戳）
   */
  endTime: {
    type: [Date, Number, String],
    required: false,
    default: 0,
  },
  /**
   * 是否正向计时
   */
  forward: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 是否计算time和endTime的差值
   */
  calculative: {
    type: Boolean,
    required: false,
    default: false,
  },
});

export type TimeProps = ExtractPropTypes<typeof useTimeProps>;
