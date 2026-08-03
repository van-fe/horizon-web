import type { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import type {
  PickerInputStatusType,
  PickerInputStyleType,
} from '~/components/Picker/src/composables/useProps';

export type TimeSelectModelValue = string | null | undefined;

export const useTimeSelectProps = declarePropType({
  /**
   * 双向绑定值，格式固定为 `HH:mm`
   * @en Binding value in the fixed `HH:mm` format.
   */
  modelValue: {
    type: [String, Object] as PropType<TimeSelectModelValue>,
    default: undefined,
  },
  /**
   * 是否禁用
   * @en Whether TimeSelect is disabled.
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否允许输入筛选时间选项
   * @en Whether the user can type to filter time options.
   */
  editable: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否可清空
   * @en Whether the selected value can be cleared.
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否将 `end` 指定的时间包含在选项中
   * @en Whether the time specified by `end` is included in the options.
   */
  includeEndTime: {
    type: Boolean,
    default: false,
  },
  /**
   * 组件尺寸
   * @en Component size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
  },
  /**
   * 占位文本，默认使用 Select 的国际化配置
   * @en Placeholder text. The localized Select placeholder is used by default.
   */
  placeholder: String,
  /**
   * 起始时间，格式为 `HH:mm`
   * @en Start time in `HH:mm` format.
   */
  start: {
    type: String,
    default: '09:00',
  },
  /**
   * 结束时间，格式为 `HH:mm`
   * @en End time in `HH:mm` format.
   */
  end: {
    type: String,
    default: '18:00',
  },
  /**
   * 时间步长，格式为 `HH:mm` 且必须大于 `00:00`
   * @en Time step in `HH:mm` format. It must be greater than `00:00`.
   */
  step: {
    type: String,
    default: '00:30',
  },
  /**
   * 最小可选时间，早于该时间的选项将被禁用
   * @en Minimum selectable time. Earlier options are disabled.
   */
  minTime: String,
  /**
   * 最大可选时间，晚于该时间的选项将被禁用
   * @en Maximum selectable time. Later options are disabled.
   */
  maxTime: String,
  /**
   * 时间选项的 Day.js 展示格式；绑定值始终使用 `HH:mm`
   * @en Day.js display format for time options. The binding value always uses `HH:mm`.
   */
  format: {
    type: String,
    default: 'HH:mm',
  },
  /**
   * 输入框样式
   * @en Input style.
   */
  inputStyle: {
    type: String as PropType<PickerInputStyleType>,
    default: 'normal',
  },
  /**
   * 输入框状态
   * @en Input status.
   */
  inputStatus: {
    type: String as PropType<PickerInputStatusType>,
    default: 'normal',
  },
  /**
   * 下拉面板放置位置
   * @en Dropdown placement.
   */
  placement: {
    type: String as PropType<PopoverProps['placement']>,
    default: 'bottom-start',
  },
  /**
   * 是否将下拉面板传送到 `body`
   * @en Whether to teleport the dropdown panel to `body`.
   */
  toBody: {
    type: Boolean,
    default: true,
  },
  /**
   * 下拉面板宽度是否与输入框相同
   * @en Whether the dropdown width follows the input width.
   */
  fitInputWidth: {
    type: [Boolean, String] as PropType<boolean | 'fit-content'>,
    default: true,
  },
  /**
   * 选项列表最大高度
   * @en Maximum option list height.
   */
  optionListMaxHeight: {
    type: [String, Number],
    default: 296,
  },
  /**
   * 空状态文字，默认使用 Select 的国际化配置
   * @en Empty-state text. The localized Select text is used by default.
   */
  emptyText: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 下拉面板额外类名
   * @en Extra class name for the dropdown panel.
   */
  panelClass: String,
  /**
   * 下拉面板额外样式
   * @en Extra styles for the dropdown panel.
   */
  panelStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 传递给 Popover 的额外配置
   * @en Extra options passed to Popover.
   */
  popoverOptions: {
    type: Object as PropType<Partial<PopoverProps>>,
  },
});

export type TimeSelectProps = ExtractPropTypes<typeof useTimeSelectProps>;
