import type { ExtractPropTypes, PropType } from 'vue';
import type { Awaitable } from '@aurora/utils';
import { declarePropType } from '@aurora/utils';

export const useSwitchProps = declarePropType({
  /** 绑定值
   * @en Configuration for model value.
 */
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  /** 是否显示状态文本
   * @en Configuration for status.
 */
  status: {
    type: Boolean,
    default: false,
  },
  /** 状态文本的展示位置
   * @en Position where the status text is displayed.
 */
  statusPosition: {
    type: String as PropType<'outside' | 'inside'>,
    default: 'outside',
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
    type: String as PropType<'top' | 'left' | 'right'>,
    default: 'top',
  },
  /** switch 大小
   * @en Configuration for size.
 */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
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
    default: false,
  },
  /**
   * `switch` 状态改变前的钩子， 返回 `false` 或者返回 `Promise` 且被 `reject` 则停止切换
    * @en Configuration for before change.
   */
  beforeChange: {
    type: [Boolean, Function] as PropType<
      boolean | ((newValue: boolean) => Awaitable<boolean | undefined>)
    >,
    default: undefined,
  },
});

export type SwitchProps = ExtractPropTypes<typeof useSwitchProps>;
