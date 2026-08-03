import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

export type TypographyType = 'default' | 'secondary' | 'success' | 'warning' | 'danger';
export type TypographySize = 'small' | 'medium' | 'large';
export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export const useTypographyProps = declarePropType({
  /**
   * 受控文本内容；启用编辑时应使用该属性
   * @en Controlled text content. Use this prop when editable is enabled.
   */
  modelValue: {
    type: String,
  },
  /**
   * 渲染的 HTML 标签；设置 level 时会自动使用对应标题标签
   * @en HTML tag to render. A heading tag is selected automatically when level is set.
   */
  tag: {
    type: String,
    default: 'span',
  },
  /**
   * 标题级别
   * @en Heading level.
   */
  level: {
    type: Number as PropType<1 | 2 | 3 | 4 | 5 | 6>,
    validator: (value: number) => Number.isInteger(value) && value >= 1 && value <= 6,
  },
  /**
   * 文本语义类型
   * @en Semantic text type.
   */
  type: {
    type: String as PropType<TypographyType>,
    default: 'default',
    values: ['default', 'secondary', 'success', 'warning', 'danger'],
  },
  /**
   * 文本尺寸；标题级别会优先决定标题尺寸
   * @en Text size. Heading level takes precedence for heading sizing.
   */
  size: {
    type: String as PropType<TypographySize>,
    default: 'medium',
    values: ['small', 'medium', 'large'],
  },
  /**
   * 字重
   * @en Font weight.
   */
  weight: {
    type: String as PropType<TypographyWeight>,
    default: 'regular',
    values: ['regular', 'medium', 'semibold', 'bold'],
  },
  /**
   * 是否以块级元素显示
   * @en Whether to display as a block.
   */
  block: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否使用斜体
   * @en Whether to render italic text.
   */
  italic: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否添加下划线
   * @en Whether to underline the text.
   */
  underline: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否添加删除线
   * @en Whether to strike through the text.
   */
  deleted: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否使用行内代码样式
   * @en Whether to use inline code styling.
   */
  code: {
    type: Boolean,
    default: false,
  },
  /**
   * 文本省略；true 表示单行，数字表示最大显示行数
   * @en Text ellipsis. True means one line; a number sets the maximum line count.
   */
  ellipsis: {
    type: [Boolean, Number] as PropType<boolean | number>,
    default: false,
    validator: (value: boolean | number) => typeof value === 'boolean' || value > 0,
  },
  /**
   * 是否显示复制按钮
   * @en Whether to show the copy action.
   */
  copyable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许编辑文本
   * @en Whether the text can be edited.
   */
  editable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用复制和编辑操作
   * @en Whether copy and edit actions are disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});

export type TypographyProps = ExtractPropTypes<typeof useTypographyProps>;
