import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import { SWITCH_DEFAULTS } from '@aurora/core';
import type {
  SwitchBeforeChange,
  SwitchLabelPosition,
  SwitchSize,
  SwitchStatusPosition,
} from '@aurora/core';

export const useSwitchProps = declarePropType({
  /** 绑定值
   * @en Configuration for model value.
 */
  modelValue: {
    type: Boolean,
    default: SWITCH_DEFAULTS.defaultValue,
    required: true,
  },
  /** 是否显示状态文本
   * @en Configuration for status.
 */
  status: {
    type: Boolean,
    default: SWITCH_DEFAULTS.status,
  },
  /** 状态文本的展示位置
   * @en Position where the status text is displayed.
 */
  statusPosition: {
    type: String as PropType<SwitchStatusPosition>,
    default: SWITCH_DEFAULTS.statusPosition,
  },
  /** switch 打开时的自定义状态文本
   * @en Configuration for status on text.
 */
  statusOnText: {
    type: String,
    default: '',
  },
  /** switch 关闭时的自定义状态文本
   * @en Configuration for status off text.
 */
  statusOffText: {
    type: String,
    default: '',
  },
  /** 标签文本
   * @en Configuration for label.
 */
  label: {
    type: String,
    default: '',
  },
  /** 标签位置
   * @en Configuration for label position.
 */
  labelPosition: {
    type: String as PropType<SwitchLabelPosition>,
    default: SWITCH_DEFAULTS.labelPosition,
  },
  /** switch 大小
   * @en Configuration for size.
 */
  size: {
    type: String as PropType<SwitchSize>,
    required: false,
  },
  /** 是否禁用
   * @en Configuration for disabled.
 */
  disabled: {
    type: Boolean,
    default: undefined,
  },

  /** 只读
   * @en Configuration for readonly.
 */
  readonly: {
    type: Boolean,
    default: SWITCH_DEFAULTS.readOnly,
  },
  /**
   * `switch` 状态改变前的钩子， 返回 `false` 或者返回 `Promise` 且被 `reject` 则停止切换
    * @en Configuration for before change.
   */
  beforeChange: {
    type: [Boolean, Function] as PropType<SwitchBeforeChange>,
    default: undefined,
  },
});

export type SwitchProps = ExtractPropTypes<typeof useSwitchProps>;
