import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

export type InputOtpType = 'numeric' | 'alphanumeric';
export type InputOtpSize = 'small' | 'medium' | 'large';

export const useInputOtpProps = declarePropType({
  /**
   * 绑定的验证码
   * @en Bound verification code.
   */
  modelValue: {
    type: String,
    default: '',
  },

  /**
   * 验证码位数
   * @en Number of verification-code characters.
   */
  length: {
    type: Number,
    default: 6,
    validator: (value: number) => Number.isInteger(value) && value >= 1 && value <= 12,
  },

  /**
   * 验证码类型；`numeric` 仅接受数字，`alphanumeric` 接受英文字母和数字
   * @en Code type. `numeric` accepts digits only; `alphanumeric` accepts ASCII letters and digits.
   */
  type: {
    type: String as PropType<InputOtpType>,
    default: 'numeric',
    validator: (value: string) => ['numeric', 'alphanumeric'].includes(value),
  },

  /**
   * 是否以圆点掩码显示验证码
   * @en Whether to mask entered characters with dots.
   */
  mask: {
    type: Boolean,
    default: false,
  },

  /**
   * 尺寸
   * @en Component size.
   */
  size: {
    type: String as PropType<InputOtpSize>,
  },

  /**
   * 是否禁用
   * @en Whether the input is disabled.
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },

  /**
   * 是否只读
   * @en Whether the input is read-only.
   */
  readonly: {
    type: Boolean,
    default: false,
  },

  /**
   * 输入状态
   * @en Validation status.
   */
  status: {
    type: String as PropType<'error'>,
  },

  /**
   * 原生 `autocomplete` 属性。默认值 `one-time-code` 可触发浏览器和系统的验证码自动填充能力
   * @en Native `autocomplete` attribute. The default `one-time-code` enables browser and OS code AutoFill where supported.
   */
  autocomplete: {
    type: String,
    default: 'one-time-code',
  },
});

export type InputOtpProps = ExtractPropTypes<typeof useInputOtpProps>;
