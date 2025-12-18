import type { ExtractPropTypes, PropType } from 'vue';
import type { Awaitable } from '@aurora/shared';
import { declarePropType } from '@aurora/shared';

export const useSwitchProps = declarePropType({
  /** 绑定值 */
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  /** 是否显示状态文本 */
  status: {
    type: Boolean,
    default: false,
  },
  /** switch 打开时的自定义状态文本 */
  statusOnText: {
    type: String,
    default: '',
  },
  /** switch 关闭时的自定义状态文本 */
  statusOffText: {
    type: String,
    default: '',
  },
  /** 标签文本 */
  label: {
    type: String,
    default: '',
  },
  /** 标签位置 */
  labelPosition: {
    type: String as PropType<'top' | 'left' | 'right'>,
    default: 'top',
  },
  /** switch 大小 */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: undefined,
  },

  /** 只读 */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * `switch` 状态改变前的钩子， 返回 `false` 或者返回 `Promise` 且被 `reject` 则停止切换
   * @version 2.0.5
   */
  beforeChange: {
    type: [Boolean, Function] as PropType<
      boolean | ((newValue: boolean) => Awaitable<boolean | undefined>)
    >,
    default: undefined,
  },
});

export type SwitchProps = ExtractPropTypes<typeof useSwitchProps>;
