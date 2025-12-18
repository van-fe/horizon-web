import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/shared';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';

export const useResultProps = declarePropType({
  /**
   * 主标题
   * 显示时最多一行，超出显示 `...`
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 副标题
   * 显示时最多两行，超出显示 `...`
   */
  subtitle: {
    type: String,
    default: '',
  },
  /**
   * 类型
   */
  type: {
    type: [String, Number] as PropType<
      'info' | 'success' | 'warning' | 'error' | 403 | 404 | 500 | '403' | '404' | '500'
    >,
    default: 'success',
  },
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
  },
  /**
   * 是否显示主按钮
   */
  primaryButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 主按钮文字
   */
  primaryButtonText: {
    type: String,
  },
  /**
   * 主要按钮 `props`
   */
  primaryButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
  },
  /**
   * 是否显示次要按钮
   */
  secondaryButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 次要按钮文字
   */
  secondaryButtonText: {
    type: String,
  },
  /**
   * 次要按钮 `props`
   */
  secondaryButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
  },
});

export type ResultProps = ExtractPropTypes<typeof useResultProps>;
