import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const TYPOGRAPHY_VARIANTS = [
  'default',
  'secondary',
  'success',
  'warning',
  'danger',
] as const;
export const TYPOGRAPHY_SIZES = ['small', 'medium', 'large'] as const;
export const TYPOGRAPHY_WEIGHTS = ['regular', 'medium', 'semibold', 'bold'] as const;
export const TYPOGRAPHY_LEVELS = [1, 2, 3, 4, 5, 6] as const;

export type TypographyVariant = (typeof TYPOGRAPHY_VARIANTS)[number];
export type TypographySize = (typeof TYPOGRAPHY_SIZES)[number];
export type TypographyWeight = (typeof TYPOGRAPHY_WEIGHTS)[number];
export type TypographyLevel = (typeof TYPOGRAPHY_LEVELS)[number];
export type TypographyEllipsis = boolean | number;

export interface TypographyCommonProps {
  /** 受控文本。@en Controlled text. */
  value?: string;
  /** 默认文本。@en Initial uncontrolled text. */
  defaultValue?: string;
  /** 渲染标签。@en Rendered tag. */
  tag?: string;
  /** 标题级别。@en Heading level. */
  level?: TypographyLevel;
  /** 文本语义类型。@en Semantic text variant. */
  variant?: TypographyVariant;
  /** 文本尺寸。@en Text size. */
  size?: TypographySize;
  /** 文本字重。@en Text weight. */
  weight?: TypographyWeight;
  /** 是否块级显示。@en Whether to use block layout. */
  block?: boolean;
  /** 是否斜体。@en Whether to render italic text. */
  italic?: boolean;
  /** 是否添加下划线。@en Whether to underline the text. */
  underline?: boolean;
  /** 是否添加删除线。@en Whether to strike through the text. */
  deleted?: boolean;
  /** 是否使用代码样式。@en Whether to use inline code styling. */
  code?: boolean;
  /** 单行或多行省略配置。@en Single-line or multi-line ellipsis setting. */
  ellipsis?: TypographyEllipsis;
  /** 是否显示复制操作。@en Whether to show a copy action. */
  copyable?: boolean;
  /** 是否允许编辑。@en Whether editing is enabled. */
  editable?: boolean;
  /** 是否禁用操作。@en Whether actions are disabled. */
  disabled?: boolean;
}

export interface TypographyEventMap {
  /** 文本值变化。@en Text value changed. */
  valueChange: [value: string];
  /** 编辑提交。@en Editing committed. */
  change: [value: string];
  /** 复制完成。@en Copy attempt completed. */
  copy: [value: string, success: boolean];
}

export interface TypographyRegionMap {
  /** 文本内容。@en Text content. */
  content: EmptyComponentApi;
  /** 前置内容。@en Leading content. */
  prefix: EmptyComponentApi;
  /** 后置内容。@en Trailing content. */
  suffix: EmptyComponentApi;
}

export interface TypographyCommandMap {
  /** 进入编辑状态。@en Enters edit mode. */
  edit(): void;
  /** 取消编辑。@en Cancels editing. */
  cancelEdit(): void;
  /** 复制当前文本。@en Copies the current text. */
  copy(): Promise<boolean>;
}

export const TYPOGRAPHY_DEFAULTS = Object.freeze({
  defaultValue: '',
  tag: 'span',
  variant: 'default',
  size: 'medium',
  weight: 'regular',
  block: false,
  italic: false,
  underline: false,
  deleted: false,
  code: false,
  ellipsis: false,
  copyable: false,
  editable: false,
  disabled: false,
} as const satisfies Required<Omit<TypographyCommonProps, 'value' | 'level'>>);

export function isTypographyLevel(value: unknown): value is TypographyLevel {
  return TYPOGRAPHY_LEVELS.includes(value as TypographyLevel);
}

export function isTypographyVariant(value: unknown): value is TypographyVariant {
  return TYPOGRAPHY_VARIANTS.includes(value as TypographyVariant);
}

export function isTypographySize(value: unknown): value is TypographySize {
  return TYPOGRAPHY_SIZES.includes(value as TypographySize);
}

export function isTypographyWeight(value: unknown): value is TypographyWeight {
  return TYPOGRAPHY_WEIGHTS.includes(value as TypographyWeight);
}

export function isTypographyEllipsis(value: unknown): value is TypographyEllipsis {
  return typeof value === 'boolean' || (typeof value === 'number' && value > 0);
}

export function resolveTypographyTag(tag: string, level?: TypographyLevel): string {
  return level === undefined ? tag : `h${level}`;
}

export function resolveTypographyEllipsisLines(ellipsis: TypographyEllipsis): number {
  return ellipsis === true ? 1 : typeof ellipsis === 'number' ? ellipsis : 0;
}

export const typographyApiContract = defineComponentApiContract<
  TypographyCommonProps,
  TypographyEventMap,
  TypographyRegionMap,
  TypographyCommandMap
>({
  defaults: TYPOGRAPHY_DEFAULTS,
  validators: {
    level: isTypographyLevel,
    variant: isTypographyVariant,
    size: isTypographySize,
    weight: isTypographyWeight,
    ellipsis: isTypographyEllipsis,
  },
});
