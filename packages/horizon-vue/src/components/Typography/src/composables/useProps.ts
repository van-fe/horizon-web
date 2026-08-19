import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';
import type {
  TypographyEllipsis,
  TypographyLevel,
  TypographySize,
  TypographyVariant,
  TypographyWeight,
} from '@aurora/core';
import {
  isTypographyEllipsis,
  isTypographyLevel,
  isTypographySize,
  isTypographyVariant,
  isTypographyWeight,
  TYPOGRAPHY_DEFAULTS,
} from '@aurora/core';

export type TypographyType = TypographyVariant;
export type { TypographySize, TypographyWeight } from '@aurora/core';

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
    default: TYPOGRAPHY_DEFAULTS.tag,
  },
  /**
   * 标题级别
   * @en Heading level.
   */
  level: {
    type: Number as PropType<TypographyLevel>,
    validator: isTypographyLevel,
  },
  /**
   * 文本语义类型
   * @en Semantic text type.
   */
  type: {
    type: String as PropType<TypographyType>,
    default: TYPOGRAPHY_DEFAULTS.variant,
    values: ['default', 'secondary', 'success', 'warning', 'danger'],
    validator: isTypographyVariant,
  },
  /**
   * 文本尺寸；标题级别会优先决定标题尺寸
   * @en Text size. Heading level takes precedence for heading sizing.
   */
  size: {
    type: String as PropType<TypographySize>,
    default: TYPOGRAPHY_DEFAULTS.size,
    values: ['small', 'medium', 'large'],
    validator: isTypographySize,
  },
  /**
   * 字重
   * @en Font weight.
   */
  weight: {
    type: String as PropType<TypographyWeight>,
    default: TYPOGRAPHY_DEFAULTS.weight,
    values: ['regular', 'medium', 'semibold', 'bold'],
    validator: isTypographyWeight,
  },
  /**
   * 是否以块级元素显示
   * @en Whether to display as a block.
   */
  block: {
    type: Boolean,
    default: TYPOGRAPHY_DEFAULTS.block,
  },
  /**
   * 是否使用斜体
   * @en Whether to render italic text.
   */
  italic: {
    type: Boolean,
    default: TYPOGRAPHY_DEFAULTS.italic,
  },
  /**
   * 是否添加下划线
   * @en Whether to underline the text.
   */
  underline: {
    type: Boolean,
    default: TYPOGRAPHY_DEFAULTS.underline,
  },
  /**
   * 是否添加删除线
   * @en Whether to strike through the text.
   */
  deleted: {
    type: Boolean,
    default: TYPOGRAPHY_DEFAULTS.deleted,
  },
  /**
   * 是否使用行内代码样式
   * @en Whether to use inline code styling.
   */
  code: {
    type: Boolean,
    default: TYPOGRAPHY_DEFAULTS.code,
  },
  /**
   * 文本省略；true 表示单行，数字表示最大显示行数
   * @en Text ellipsis. True means one line; a number sets the maximum line count.
   */
  ellipsis: {
    type: [Boolean, Number] as PropType<TypographyEllipsis>,
    default: TYPOGRAPHY_DEFAULTS.ellipsis,
    validator: isTypographyEllipsis,
  },
  /**
   * 是否显示复制按钮
   * @en Whether to show the copy action.
   */
  copyable: {
    type: Boolean,
    default: TYPOGRAPHY_DEFAULTS.copyable,
  },
  /**
   * 是否允许编辑文本
   * @en Whether the text can be edited.
   */
  editable: {
    type: Boolean,
    default: TYPOGRAPHY_DEFAULTS.editable,
  },
  /**
   * 是否禁用复制和编辑操作
   * @en Whether copy and edit actions are disabled.
   */
  disabled: {
    type: Boolean,
    default: TYPOGRAPHY_DEFAULTS.disabled,
  },
});

export type TypographyProps = ExtractPropTypes<typeof useTypographyProps>;
