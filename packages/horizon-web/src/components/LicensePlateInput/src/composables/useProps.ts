import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import { CHINA_LICENSE_PLATE_PROVINCES } from '../utils';

export const useLicensePlateInputProps = declarePropType({
  /**
   * 绑定的完整车牌号
   * @en Complete bound license plate value.
   */
  modelValue: { type: String, default: '' },
  /**
   * 组件尺寸
   * @en Component size.
   */
  size: { type: String as PropType<'small' | 'medium' | 'large'>, default: undefined },
  /**
   * 输入控件样式
   * @en Visual style of the input controls.
   */
  inputStyle: {
    type: String as PropType<'normal' | 'emphasize' | 'no-border'>,
    default: 'normal',
  },
  /**
   * 是否禁用
   * @en Whether the component is disabled.
   */
  disabled: { type: Boolean, default: false },
  /**
   * 是否只读
   * @en Whether the component is read-only.
   */
  readonly: { type: Boolean, default: false },
  /**
   * 是否显示清空按钮
   * @en Whether to show the clear action.
   */
  clearable: { type: Boolean, default: true },
  /**
   * 车牌号输入占位文本
   * @en Placeholder for the license plate number field.
   */
  placeholder: { type: String, default: '' },
  /**
   * 组件的无障碍名称
   * @en Accessible name for the component.
   */
  ariaLabel: { type: String, default: '' },
  /**
   * 省份选择器的无障碍名称
   * @en Accessible name for the province selector.
   */
  provinceAriaLabel: { type: String, default: '' },
  /**
   * 空值时默认选中的省份简称
   * @en Province abbreviation selected when the value is empty.
   */
  defaultProvince: {
    type: String,
    default: '京',
    validator: (value: string) => value.length === 1,
  },
  /**
   * 可选的省份简称列表
   * @en Available province abbreviations.
   */
  provinces: {
    type: Array as PropType<string[]>,
    default: () => [...CHINA_LICENSE_PLATE_PROVINCES],
    validator: (value: string[]) => value.length > 0 && value.every(item => item.length === 1),
  },
  /**
   * 是否在失去焦点后自动显示格式错误状态
   * @en Whether to show a format error automatically after blur.
   */
  validateOnBlur: { type: Boolean, default: true },
  /**
   * 手动设置错误状态
   * @en Manually set the error state.
   */
  status: { type: String as PropType<'error'>, default: undefined },
});

export type LicensePlateInputProps = ExtractPropTypes<typeof useLicensePlateInputProps>;
