import type { ExtractPropTypes, PropType } from 'vue';
import type { ResultCommonProps, ResultSize, ResultType } from '@aurora/core';
import { isResultSize, isResultType, RESULT_DEFAULTS } from '@aurora/core';
import { declarePropType } from '@aurora/utils';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';

export const useResultProps = declarePropType({
  /**
   * 主标题
   * 显示时最多一行，超出显示 `...`
   * @en Configuration for title.
   */
  title: {
    type: String,
    default: RESULT_DEFAULTS.title,
  },
  /**
   * 副标题
   * 显示时最多两行，超出显示 `...`
   * @en Configuration for subtitle.
   */
  subtitle: {
    type: String,
    default: RESULT_DEFAULTS.subtitle,
  },
  /**
   * 类型
   * @en Configuration for type.
   */
  type: {
    type: [String, Number] as PropType<ResultType>,
    default: RESULT_DEFAULTS.type,
    validator: isResultType,
  },
  /**
   * 尺寸
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<ResultSize>,
    validator: isResultSize,
  },
  /**
   * 是否显示主按钮
   * @en Configuration for primary button.
   */
  primaryButton: {
    type: Boolean,
    default: RESULT_DEFAULTS.primaryButton,
  },
  /**
   * 主按钮文字
   * @en Configuration for primary button text.
   */
  primaryButtonText: {
    type: String,
  },
  /**
   * 主要按钮 `props`
   * @en Configuration for primary button props.
   */
  primaryButtonProps: {
    type: Object as PropType<ResultCommonProps<Partial<ButtonProps>>['primaryButtonProps']>,
  },
  /**
   * 是否显示次要按钮
   * @en Configuration for secondary button.
   */
  secondaryButton: {
    type: Boolean,
    default: RESULT_DEFAULTS.secondaryButton,
  },
  /**
   * 次要按钮文字
   * @en Configuration for secondary button text.
   */
  secondaryButtonText: {
    type: String,
  },
  /**
   * 次要按钮 `props`
   * @en Configuration for secondary button props.
   */
  secondaryButtonProps: {
    type: Object as PropType<ResultCommonProps<Partial<ButtonProps>>['secondaryButtonProps']>,
  },
});

export type ResultProps = ExtractPropTypes<typeof useResultProps>;
