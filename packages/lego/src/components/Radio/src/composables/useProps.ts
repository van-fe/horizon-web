import type {
  ComputedRef,
  ExtractPropTypes,
  PropType,
  SetupContext,
  Ref,
  UnwrapNestedRefs,
} from 'vue';
import type { RadioEmits } from './useEmits';
import { declarePropType } from '@nio-fe/shared';
import type { NFormItemTriggerType } from '~/components/Form/src/utils/injectedKeys';
import { nextTick } from 'vue';

export const useRadioProps = declarePropType({
  /**
   * 选中项绑定值
   */
  modelValue: {
    type: [String, Number, Boolean],
    required: false,
    default: '',
  },
  /**
   * 单选框对应的值
   * @deprecated value
   */
  label: {
    type: [String, Number, Boolean],
    required: false,
    default: '',
  },
  /**
   * 单选框按钮对应的值
   */
  value: {
    type: [String, Number, Boolean],
    required: false,
    default: '',
  },
  /**
   * 是否禁用单选框
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
   *  单选框对应尺寸，仅在开启border有效
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
   * 同原生 `name`
   */
  name: {
    type: String,
  },
});

export const useRadioButtonProps = declarePropType({
  /**
   * 选中项绑定值
   */
  modelValue: {
    type: [String, Number, Boolean],
    required: false,
    default: '',
  },
  /**
   * 单选框按钮对应的值
   * @deprecated value
   */
  label: {
    type: [String, Number, Boolean],
    required: false,
    default: '',
  },
  /**
   * 单选框按钮对应的值
   */
  value: {
    type: [String, Number, Boolean],
    required: false,
    default: '',
  },
  /**
   * 是否禁用单选框按钮
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   *  单选框按钮对应尺寸
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
   * 支持全部主题色
   */
  fill: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 同原生 `name`
   */
  name: {
    type: String,
  },
});

export const useRadioGroupProps = declarePropType({
  /**
   * 选中项绑定值
   */
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
  },
  /**
   * 是否禁用单选框(按钮)组
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   *  单选框组尺寸
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
   * 同原生 `name`，会设置给子元素
   */
  name: {
    type: String,
  },
});

export interface RadioGroupPropsProvideType {
  value?: ComputedRef<string | number | boolean | undefined>;
  changeEvent?: Function;
  blurEvent?: Function;
  disabled?: ComputedRef<boolean | undefined>;
  viewable?: ComputedRef<boolean | undefined>;
  size?: ComputedRef<'small' | 'medium' | 'large' | undefined>;
  name?: Ref<string | undefined>;
}

export function handleChange(
  value: string | number | boolean,
  emit: SetupContext<RadioEmits>['emit'],
  RadioGroupInject: UnwrapNestedRefs<RadioGroupPropsProvideType> | undefined,
  formItemTrigger?: NFormItemTriggerType,
): void {
  if (!!RadioGroupInject) {
    emit('change', value);
    RadioGroupInject?.changeEvent?.(value);
  } else {
    emit('change', value);
    emit('update:modelValue', value);
    nextTick().then(() => {
      formItemTrigger?.('change');
    });
  }
}

export function handleBlur(
  evt: FocusEvent,
  emit: SetupContext<RadioEmits>['emit'],
  RadioGroupInject: UnwrapNestedRefs<RadioGroupPropsProvideType> | undefined,
  formItemTrigger?: NFormItemTriggerType,
) {
  if (!!RadioGroupInject) {
    emit('blur', evt);
    RadioGroupInject?.blurEvent?.(evt);
  } else {
    emit('blur', evt);
    nextTick().then(() => {
      formItemTrigger?.('blur');
    });
  }
}

export type RadioProps = ExtractPropTypes<typeof useRadioProps>;
export type RadioButtonProps = ExtractPropTypes<typeof useRadioButtonProps>;
export type RadioGroupProps = ExtractPropTypes<typeof useRadioGroupProps>;
