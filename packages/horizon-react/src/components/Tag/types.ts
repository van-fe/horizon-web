import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import type {
  TagCommandMap,
  TagCommonProps,
  TagGroupCommandMap,
  TagGroupCommonProps,
  TagId,
} from '@aurora/core';
import type { TooltipProps } from '../Tooltip';

export interface TagHandle extends TagCommandMap {
  readonly element: HTMLSpanElement | null;
}

export interface TagProps
  extends
    Omit<TagCommonProps, 'pure' | 'tooltip'>,
    Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color' | 'id' | 'onClick'> {
  /** 标签内容。 @en Tag content. */
  children?: ReactNode;
  /** 图标内容。 @en Icon content. */
  icon?: ReactNode;
  /** 头像内容。 @en Avatar content. */
  avatarContent?: ReactNode;
  /** Tooltip 内容。 @en Tooltip content. */
  tooltipContent?: ReactNode;
  /** Tooltip 文字或启用状态。 @en Tooltip text or enablement. */
  tooltip?: string | boolean;
  /** Tooltip 原生参数。 @en Native React Tooltip options. */
  tooltipOptions?: Omit<
    TooltipProps,
    'children' | 'content' | 'disabled' | 'hideAfter' | 'showAfter'
  >;
  /** 只渲染 children。 @en Renders only children. */
  pure?: boolean;
  /** 激活状态提案。 @en Called with a proposed active state. */
  onActiveChange?: (active: boolean) => void;
  /** 标签操作。 @en Tag action. */
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  /** 关闭操作。 @en Close action. */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** @internal */
  __create?: boolean;
}

export interface TagGroupHandle extends TagGroupCommandMap {
  readonly element: HTMLDivElement | null;
}

export interface TagGroupProps
  extends
    TagGroupCommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onToggle' | 'prefix'> {
  /** 标签列表。 @en Tag list. */
  children?: ReactNode;
  /** 折叠摘要 Tag 参数。 @en Collapsed-summary Tag props. */
  collapseTagProps?: Partial<TagProps>;
  /** 创建操作 Tag 参数。 @en Create-action Tag props. */
  createTagProps?: Partial<TagProps>;
  /** 创建文字 renderer。 @en Create-label renderer. */
  renderCreateText?: (tags: readonly TagCommonProps[]) => ReactNode;
  /** 创建操作 renderer。 @en Create-action renderer. */
  renderCreate?: (tags: readonly TagCommonProps[]) => ReactNode;
  /** 组前内容。 @en Content before the group. */
  prepend?: ReactNode;
  /** 组后内容。 @en Content after the group. */
  append?: ReactNode;
  /** 容器前置内容。 @en Leading container content. */
  prefix?: ReactNode;
  /** 容器后置内容。 @en Trailing container content. */
  suffix?: ReactNode;
  /** 浮层内部 class。 @en Floating content class name. */
  popperInnerClass?: string;
  /** 创建完成。 @en Called after a tag is created. */
  onCreated?: (content: string) => void;
  /** 编辑完成。 @en Called after a tag is edited. */
  onEdited?: (content: string, oldValue: string, id?: TagId) => void;
  /** 关闭完成。 @en Called after a tag is closed. */
  onClosed?: (id?: TagId) => void;
  /** 展开状态变化。 @en Called when expanded state changes. */
  onToggled?: (expanded: boolean) => void;
  /** 首次检测到溢出。 @en Called when overflow is first detected. */
  onExceeded?: () => void;
}
