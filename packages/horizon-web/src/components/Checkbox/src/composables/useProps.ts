import type { ExtractPropTypes, PropType, SetupContext } from 'vue';
import type { CheckboxEmits } from './useEmits';
import { declarePropType } from '@aurora/utils';
import { nextTick } from 'vue';
import type { CheckboxGroupPropsProvideType, CheckboxUnionType } from '../utils/types';

export const useCheckboxProps = declarePropType({
  /**
   * 选中项绑定值
   */
  modelValue: {
    type: [Array, String, Number, Boolean] as PropType<
      Array<CheckboxUnionType> | CheckboxUnionType
    >,
    required: false,
    default: undefined,
  },
  /**
   * 多选框对应的值（只有在checkbox-group或者modelValue类型为array时有效）
   */
  label: {
    type: [String, Number, Boolean],
    required: false,
    default: '',
  },
  /**
   * 选中时的值
   */
  trueLabel: {
    type: [String, Number, Boolean],
    required: false,
    default: undefined,
  },
  /**
   * 未选中时的值
   */
  falseLabel: {
    type: [String, Number, Boolean],
    required: false,
    default: undefined,
  },
  /**
   * 是否禁用多选框
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否显示边框
   */
  border: {
    type: Boolean,
    default: false,
  },
  /**
   * 中间状态，用以表示 checkbox 的不确定,仅控制样式
   * 一般用以显示全选效果
   */
  indeterminate: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 开启只读模式
   */
  viewable: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   *  多选框对应尺寸，仅在开启border有效
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 是否强制使用最新尺寸规则
   * @version 2.0.2
   */
  forceNewestSize: {
    type: Boolean,
    default: false,
  },
});

export const useCheckboxButtonProps = declarePropType({
  /**
   * 选中项绑定值
   */
  modelValue: {
    type: [Array, String, Number, Boolean] as PropType<
      Array<CheckboxUnionType> | CheckboxUnionType
    >,
    required: false,
    default: () => [],
  },
  /**
   * 多选框按钮对应的值（只有在checkbox-group或者modelValue类型为array时有效）
   */
  label: {
    type: [String, Number, Boolean],
    required: false,
    default: '',
  },
  /**
   * 选中时的值
   */
  trueLabel: {
    type: [String, Number, Boolean],
    required: false,
    default: undefined,
  },
  /**
   * 未选中时的值
   */
  falseLabel: {
    type: [String, Number, Boolean],
    required: false,
    default: undefined,
  },
  /**
   * 是否禁用多选框按钮
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   *  多选框按钮对应尺寸
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 是否强制使用最新尺寸规则
   * @version 2.0.2
   */
  forceNewestSize: {
    type: Boolean,
    default: false,
  },
  /**
   * 开启只读模式
   */
  viewable: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 填充色
   */
  fill: {
    type: String,
    required: false,
    default: '',
  },
});

export const useCheckboxGroupProps = declarePropType({
  /**
   * 选中项绑定值数组
   */
  modelValue: {
    type: Array as PropType<Array<string | boolean | number>>,
    required: false,
  },
  /**
   * 是否禁用多选框(按钮)组
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   *  多选框按钮组对应尺寸
   *  对Checkbox无作用
   */
  size: {
    type: String as PropType<'large' | 'small' | 'medium'>,
    required: false,
  },
  /**
   * 是否强制使用最新尺寸规则
   * @version 2.0.2
   */
  forceNewestSize: {
    type: Boolean,
    default: false,
  },
  /**
   * 开启只读模式
   */
  viewable: {
    type: Boolean,
    required: false,
    default: false,
  },
});

export function handleChange<CheckboxUnionType>(
  modelValue: CheckboxUnionType | CheckboxUnionType[] | boolean,
  labelValue: CheckboxUnionType,
  emit: SetupContext<CheckboxEmits>['emit'],
  checkGroupInject: CheckboxGroupPropsProvideType | undefined,
  formItemTrigger?: (type: 'change' | 'blur') => void,
  trueValue?: CheckboxUnionType,
  falseValue?: CheckboxUnionType,
): void {
  const value = trueValue !== undefined ? trueValue : labelValue;
  if (Array.isArray(modelValue)) {
    if (modelValue.includes(value)) {
      modelValue.splice(modelValue.indexOf(value), 1);
    } else {
      modelValue.splice(modelValue.length, 0, value);
    }
  } else {
    if (trueValue !== undefined) {
      modelValue = modelValue === trueValue ? falseValue ?? false : trueValue;
    } else {
      modelValue = modelValue === true ? falseValue ?? false : true;
    }
  }
  if (!!checkGroupInject && checkGroupInject.value !== false) {
    emit('change', (modelValue as CheckboxUnionType[]).includes(value));
    emit('update:modelValue', (modelValue as CheckboxUnionType[]).includes(value));
    checkGroupInject?.changeEvent?.(modelValue);
  } else {
    emit('update:modelValue', modelValue as boolean);
    emit('change', modelValue as boolean);
    nextTick().then(() => {
      formItemTrigger?.('change');
    });
  }
}

export function handleBlur(
  evt: FocusEvent,
  emit: SetupContext<CheckboxEmits>['emit'],
  checkGroupInject: CheckboxGroupPropsProvideType | undefined,
  formItemTrigger?: (type: 'change' | 'blur') => void,
) {
  if (!!checkGroupInject && checkGroupInject.value !== false) {
    checkGroupInject?.blurEvent?.(evt);
  } else {
    emit('blur', evt);
    nextTick().then(() => {
      formItemTrigger?.('blur');
    });
  }
}

export function isChecked(
  modelValue: Array<CheckboxUnionType> | CheckboxUnionType | undefined,
  propValue: CheckboxUnionType,
  trueValue?: CheckboxUnionType,
): boolean {
  const isArray = Array.isArray(modelValue);
  return isArray
    ? (modelValue as Array<CheckboxUnionType>).includes(
        trueValue === undefined ? propValue : trueValue,
      )
    : trueValue === undefined
      ? !!modelValue
      : modelValue === trueValue;
}

export type CheckboxProps = ExtractPropTypes<typeof useCheckboxProps>;
export type CheckboxButtonProps = ExtractPropTypes<typeof useCheckboxButtonProps>;
export type CheckboxGroupProps = ExtractPropTypes<typeof useCheckboxGroupProps>;
