import type {
  ComputedRef,
  ExtractPropTypes,
  PropType,
  SetupContext,
  Ref,
  UnwrapNestedRefs,
} from 'vue';
import type { RadioEmits } from './useEmits';
import { declarePropType } from '@aurora/utils';
import type { HFormItemTriggerType } from '~/components/Form/src/utils/injectedKeys';
import { nextTick } from 'vue';

export const useRadioProps = declarePropType({
  /**
   * 选中项绑定值
   * @en Configuration for model value.
   */
  modelValue: {
    type: [String, Number, Boolean],
    required: false,
    default: '',
  },
  /**
   * 单选框按钮对应的值
   * @en Configuration for value.
   */
  value: {
    type: [String, Number, Boolean],
    required: false,
    default: '',
  },
  /**
   * 是否禁用单选框
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否显示边框
   * @en Configuration for border.
   */
  border: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 开启只读模式
   * @en Configuration for viewable.
   */
  viewable: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   *  单选框对应尺寸，仅在开启border有效
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 同原生 `name`
   * @en Configuration for name.
   */
  name: {
    type: String,
  },
});

export const useRadioButtonProps = declarePropType({
  /**
   * 选中项绑定值
   * @en Configuration for model value.
   */
  modelValue: {
    type: [String, Number, Boolean],
    required: false,
    default: '',
  },
  /**
   * 单选框按钮对应的值
   * @en Configuration for value.
   */
  value: {
    type: [String, Number, Boolean],
    required: false,
    default: '',
  },
  /**
   * 是否禁用单选框按钮
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   *  单选框按钮对应尺寸
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 开启只读模式
   * @en Configuration for viewable.
   */
  viewable: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 填充色
   * 支持全部主题色
   * @en Configuration for fill.
   */
  fill: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 同原生 `name`
   * @en Configuration for name.
   */
  name: {
    type: String,
  },
});

export const useRadioGroupProps = declarePropType({
  /**
   * 选中项绑定值
   * @en Configuration for model value.
   */
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
  },
  /**
   * 是否禁用单选框(按钮)组
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   *  单选框组尺寸
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 开启只读模式
   * @en Configuration for viewable.
   */
  viewable: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 同原生 `name`，会设置给子元素
   * @en Configuration for name.
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
  formItemTrigger?: HFormItemTriggerType,
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
  formItemTrigger?: HFormItemTriggerType,
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
