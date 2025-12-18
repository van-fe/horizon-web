import type { Component, ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useControlsProps = declarePropType({
  /**
   * 总的权限数组，在 `n-control` 内传入的 `label` 可以过滤是否显示
   */
  accessList: {
    type: Array as PropType<string[]>,
  },
  /**
   * 是否启用 `tooltip`
   */
  useTooltip: {
    type: Boolean,
    default: true,
  },
  /**
   * 主题
   */
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
  /**
   * 子元素中 `icon` 的颜色
   */
  iconColor: {
    type: Array as PropType<string[]>,
  },
  /**
   * 是否禁止
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});

export const useControlProps = declarePropType({
  /**
   * 唯一标识，如果宽度过窄会省略到下拉菜单中，点击后触发会告知是哪个 `control` 被点击
   */
  label: {
    type: String,
    required: true,
  },
  /**
   * 是否显示
   */
  visible: {
    type: Boolean,
    default: true,
  },
  /**
   * 按钮 `icon` 对象
   * 需要注意不是传入 `icon.name`，而是 `icon` 对象
   */
  icon: {
    type: Object as PropType<Component>,
  },
  /**
   * `icon` 的颜色
   */
  iconColor: {
    type: Array as PropType<string[]>,
  },
  /**
   * 控制器文字
   */
  text: {
    type: String,
    default: '',
  },
  /**
   * 是否禁止
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});

export type ControlsProps = ExtractPropTypes<typeof useControlsProps>;
export type ControlProps = ExtractPropTypes<typeof useControlProps>;
