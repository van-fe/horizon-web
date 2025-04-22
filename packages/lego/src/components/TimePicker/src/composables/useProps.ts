import { declarePropType } from '@nio-fe/shared';
import type { ExtractPropTypes, PropType } from 'vue';
import type { ButtonProps } from '../../../Button/src/composables/useProps';

export type NTimePickerType = 'time' | 'minutes' | 'seconds';
export type TimeSpinnerType = 'hours' | 'minutes' | 'seconds';
export const usePickOptionsProps = declarePropType({
  /**
   * 开始时间 仅type为'time'有效
   */
  start: {
    type: String,
    default: '09:00',
  },

  /**
   * 间隔时间 仅type为'time'有效
   */
  step: {
    type: String,
    default: '00:30',
  },

  /**
   * 结束时间 仅type为'time'有效
   */
  end: {
    type: String,
    default: '18:00',
  },

  /**
   * 分钟间隔时间 仅type为'minutes'和'seconds'有效
   */
  minutesStep: {
    type: Number,
    default: 1,
  },

  /**
   * 秒钟间隔时间 仅type为'seconds'有效
   */
  secondsStep: {
    type: Number,
    default: 1,
  },

  /**
   * 自定义小时列，不设置，默认0-23小时 仅type为'minutes、seconds'有效，类型为：string｜number[]
   */
  selectableHours: {
    type: Array,
    default: [],
  },

  /**
   * 自定义分钟列，不设置，默认0-59分钟 仅type为'minutes、seconds'有效，类型为：string｜number[]
   */
  selectableMinutes: {
    type: Array,
    default: [],
  },

  /**
   * 自定义秒钟列，不设置，默认0-59秒钟 仅type为'seconds'有效，类型为：string｜number[]
   */
  selectableSeconds: {
    type: Array,
    default: [],
  },
});
export type PickerOptionsProps = ExtractPropTypes<typeof usePickOptionsProps>;
export type ModelValueType = Date | string | number | null | (Date | string | number | null)[];
export const useTimePickerProps = declarePropType({
  /** 绑定值 */
  modelValue: {
    type: [Date, String, Number, Array] as PropType<ModelValueType>,
    default: '',
  },
  /** 显示类型 */
  type: {
    type: String as PropType<NTimePickerType>,
    default: 'minutes',
  },
  /**
   * inputStyle属性
   * @version 2.4.0
   */
  inputStyle: {
    type: String as PropType<'normal' | 'emphasize' | 'no-border'>,
    default: 'normal',
  },
  /** 时间选择框高度尺寸 */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /** 是否显示清除按钮 */
  clearable: {
    type: Boolean,
    default: true,
  },
  /** 输入框是否只读 */
  inputReadonly: {
    type: Boolean,
    default: false,
  },
  /** 时间选择框宽度尺寸 例如100%,400,400px */
  width: {
    type: String,
    default: '',
  },
  /** 占位内容 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 是否为时间范围选择 */
  isRange: {
    type: Boolean,
    default: false,
  },
  /** 触发器input数量，仅对is-range时间范围有效 */
  triggerNumber: {
    type: Number,
    default: 2,
  },
  /** 时间范围开始占位内容 */
  startPlaceholder: {
    type: String,
    default: '',
  },
  /** 时间范围结束占位内容 */
  endPlaceholder: {
    type: String,
    default: '',
  },
  /** 时间范围选择时分隔符 */
  rangeSeparator: {
    type: String,
    default: '',
  },
  /** 时间参数，详细说明见PickerOptions Props */
  pickerOptions: {
    type: Object as PropType<PickerOptionsProps>,
    default() {
      return {
        start: '00:00',
        step: '00:30',
        end: '23:30',
        minutesStep: 1,
        secondsStep: 1,
        selectableHours: [],
        selectableMinutes: [],
        selectableSeconds: [],
      };
    },
  },
  /** 时间组件是否禁用 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 设置禁选时间，参数为当前时间对象{year, month, day, hours, minutes, seconds}，需要返回 Boolean */
  disabledTime: {
    type: Function as PropType<(panelTime: PanelTimeType, placement: string) => boolean>,
  },
  /** picker下拉框自定义类名 */
  popperClass: {
    type: String,
    default: '',
  },
  /** 输入框显示值的格式，默认值见下表 */
  format: {
    type: String,
    default: '',
  },
  /** 绑定值的格式，不指定则为 Date 对象 */
  valueFormat: {
    type: String,
    default: '',
  },
  /** 时间单元格是否展示tooltip，参数为当前时间对象{year, month, day, hours, minutes, seconds}，返回对象：show是否展示，content展示内容 */
  showTimeTooltip: {
    type: Function as PropType<(panelTime: PanelTimeType) => { show: boolean; content: string }>,
    required: false,
  },
  /** 设置前缀图标 */
  prefixIcon: {
    type: String,
    default: 'time',
  },
  /** 设置清除图标 */
  suffixIcon: {
    type: String,
    default: 'close_filled',
  },
  /**
   * 日期面板弹出位置
   * @version 2.8.2
   */
  placement: {
    type: String as PropType<
      | 'auto'
      | 'auto-start'
      | 'auto-end'
      | 'top-start'
      | 'top-end'
      | 'bottom-start'
      | 'bottom-end'
      | 'right-start'
      | 'right-end'
      | 'left-start'
      | 'left-end'
      | 'top'
      | 'bottom'
      | 'right'
      | 'left'
    >,
    default: 'bottom-start',
  },
  /** 当显示位置的空间不够时 设置时间面板的默认显示位置顺序 */
  fallbackPlacements: {
    type: Array as PropType<Array<'top' | 'bottom' | 'right' | 'left' | 'auto'>>,
    default: ['top', 'bottom', 'right', 'left', 'auto'],
  },
  /**
   * 是否阻止 `popper` 超出边界
   * @version 2.8.2
   */
  preventOverflow: {
    type: Boolean,
    default: false,
  },
  /** 自定义单元格文案 */
  formatCellText: {
    type: Function as PropType<
      (type: 'hours' | 'minutes' | 'seconds', text: PanelTimeType) => String
    >,
    required: false,
  },
  /** 自定义触发器文案 */
  formatTriggerText: {
    type: Function as PropType<(value: Date | string | number | null, text: string) => String>,
    required: false,
  },
  /** 是否显示取消按钮 */
  showCancelButton: {
    type: Boolean,
    default: true,
  },
  /** 确认按钮的文本内容 */
  confirmButtonText: {
    type: String,
    required: false,
  },
  /** 取消按钮的文本内容 */
  cancelButtonText: {
    type: String,
    required: false,
  },
  /** 确认按钮的属性设置，参考button组件props */
  confirmButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: () => {
      return {
        type: 'primary',
        kind: 'positive',
        size: 'mini',
      };
    },
  },
  /** 取消按钮的属性设置，参考button组件props */
  cancelButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: () => {
      return {
        type: 'secondary',
        kind: 'neutral',
        size: 'mini',
      };
    },
  },
  /** 输入框状态 */
  inputStatus: {
    type: String as PropType<'error'>,
    required: false,
  },
  /** 是否显示底部操作按钮 */
  showFooter: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否将弹出层挂载在 `body` 上
   */
  toBody: {
    type: Boolean,
    default: true,
  },
  /**
   * 时间范围时，前后时间是否联动，即前时间小于后时间，大于后时间的时间不可选
   * @version 2.8.4
   */
  isLinkPanels: {
    type: Boolean,
    default: true,
  },
  /**
   * type为'time'时，是否支持选择多个时间
   * @version 2.11.5
   */
  isMultipleTime: {
    type: Boolean,
    default: false,
  },
  /**
   * 日期时间范围时需要
   * @invisible
   */
  datePlacement: {
    type: String,
    default: 'left',
  },
  /**
   * 日期时间范围时需要
   * @invisible
   */
  pickerDate: {
    type: [Object, Array] as PropType<PanelTimeType | PanelTimeType[]>,
    default: () => ({}),
  },
  /**
   * 日期时间需要
   * 是否支持第二天时间选择
   * @invisible
   */
  supportSecondDay: {
    type: Boolean,
    default: true,
  },
});

export type TimePickerProps = ExtractPropTypes<typeof useTimePickerProps>;
export const usePanelTimeProps = {
  panelTime: {
    type: [Object, Array] as PropType<PanelTimeType | PanelTimeType[]>,
    default() {
      return {};
    },
  },
  placement: String,
};
export interface TimeGrid {
  id: string;
  type?: string;
  time?: number;
  text: string;
  isSelected: boolean;
  isDisabled: boolean;
  scrollHeight: number;
  tooltip: {
    content: string;
    show: boolean;
  };
}
export interface PanelTimeType {
  years?: number | undefined;
  months?: number | undefined;
  date?: number | undefined;
  year?: number | undefined;
  month?: number | undefined;
  day?: number | undefined;
  hours?: number | undefined;
  minutes?: number | undefined;
  seconds?: number | undefined;
}

export type PickerTimeType = PanelTimeType | PanelTimeType[];
