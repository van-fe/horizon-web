import type { EmptyComponentApi } from '../_shared/api';
import {
  createComponentPropDefaults,
  createComponentPropValidators,
  defineComponentApiContract,
  defineComponentPropDefinitions,
} from '../_shared/api';

export const TAG_VARIANTS = ['', 'success', 'info', 'warning', 'error'] as const;
export const TAG_SIZES = ['small', 'medium', 'large'] as const;
export const TAG_TOOLTIP_RENDER_TYPES = ['innerText', 'full'] as const;

export type TagVariant = (typeof TAG_VARIANTS)[number];
export type TagSize = (typeof TAG_SIZES)[number];
export type TagTooltipRenderType = (typeof TAG_TOOLTIP_RENDER_TYPES)[number];
export type TagId = string | number | symbol;
export type TagGuardResult = boolean | void | PromiseLike<boolean | void>;

export interface TagCommonProps {
  /** 标签标识符。 @en Tag identifier. */
  id?: TagId;
  /** 受控激活状态；未提供时标签不承担选择状态。 @en Controlled active state; when omitted the tag is not selectable. */
  active?: boolean;
  /** 语义视觉类型。 @en Semantic visual variant. */
  variant?: TagVariant;
  /** 标签尺寸。 @en Tag size. */
  size?: TagSize;
  /** 加粗内容。 @en Uses bold content. */
  bold?: boolean;
  /** 允许触发标签操作。 @en Allows the tag action to be triggered. */
  clickable?: boolean;
  /** 显示关闭操作。 @en Shows the close action. */
  closable?: boolean;
  /** 允许编辑标签文字。 @en Allows editing the tag label. */
  editable?: boolean;
  /** 禁止交互。 @en Prevents interaction. */
  disabled?: boolean;
  /** 使用线性外观。 @en Uses the plain treatment. */
  plain?: boolean;
  /** 使用圆角外观。 @en Uses rounded corners. */
  round?: boolean;
  /** 头像图片地址。 @en Avatar image URL. */
  avatar?: string;
  /** 使用等宽等高外观。 @en Uses equal width and height. */
  equally?: boolean;
  /** 等宽标签悬浮后显示关闭按钮的延迟。 @en Delay before showing the close action on an equal tag. */
  showCloseDelay?: number;
  /** 自动生成状态色的基础颜色。 @en Base color used to derive interactive colors. */
  color?: string;
  /** 自定义背景颜色。 @en Custom background color. */
  background?: string;
  /** 显示加载状态。 @en Shows the loading state. */
  loading?: boolean;
  /** Tooltip 文字或启用状态。 @en Tooltip text or enablement. */
  tooltip?: string | boolean;
  /** Tooltip 显示延迟。 @en Tooltip show delay. */
  tooltipShowAfter?: number;
  /** Tooltip 隐藏延迟。 @en Tooltip hide delay. */
  tooltipHideAfter?: number;
  /** 禁用状态过渡。 @en Disables visual transitions. */
  disableTransitions?: boolean;
  /** 只渲染内容区域。 @en Renders only the content region. */
  pure?: boolean;
}

export interface TagGroupCommonProps {
  /** 组内标签尺寸。 @en Size inherited by grouped tags. */
  size?: TagSize;
  /** 组内标签是否可编辑。 @en Whether grouped tags are editable. */
  editable?: boolean;
  /** 组内标签是否禁用。 @en Whether grouped tags are disabled. */
  disabled?: boolean;
  /** 是否折叠溢出标签。 @en Whether overflowing tags collapse. */
  collapse?: boolean;
  /** 是否允许展开隐藏标签。 @en Whether hidden tags can be expanded. */
  expand?: boolean;
  /** 折叠摘要是否显示提示。 @en Whether the collapsed summary shows a tooltip. */
  collapseUseTooltip?: boolean;
  /** 折叠提示的内容方式。 @en Content mode used by the collapsed tooltip. */
  tooltipRenderType?: TagTooltipRenderType;
  /** 隐藏标签文字的分隔符。 @en Separator between hidden tag labels. */
  separator?: string;
  /** 是否显示创建标签操作。 @en Whether the create-tag action is shown. */
  useCreate?: boolean;
  /** 创建前守卫。 @en Guard evaluated before a tag is created. */
  beforeCreate?: (content: string) => TagGuardResult;
  /** 编辑前守卫。 @en Guard evaluated before a tag is edited. */
  beforeEdit?: (content: string, oldValue: string, id?: TagId) => TagGuardResult;
  /** 关闭前守卫。 @en Guard evaluated before a tag is closed. */
  beforeClose?: (id?: TagId) => TagGuardResult;
  /** 创建标签操作文字。 @en Create-tag action label. */
  createText?: string;
  /** 最大标签数量。 @en Maximum number of tags. */
  maxTags?: number;
  /** 禁用状态过渡。 @en Disables visual transitions. */
  disableTransitions?: boolean;
  /** 折叠时尽量填满容器。 @en Fills the available width while collapsed. */
  fillUp?: boolean;
  /** 折叠时至少展示的标签数量。 @en Minimum number of tags shown while collapsed. */
  minDisplayed?: number;
  /** Tooltip 显示延迟。 @en Tooltip show delay. */
  tooltipShowAfter?: number;
  /** Tooltip 隐藏延迟。 @en Tooltip hide delay. */
  tooltipHideAfter?: number;
}

export interface TagEventMap<Event = unknown> {
  /** 激活状态变化提案。 @en Proposed active-state change. */
  activeChange: [active: boolean];
  /** 标签操作。 @en Tag action. */
  press: [event: Event];
  /** 关闭操作。 @en Close action. */
  close: [event: Event];
}

export interface TagGroupEventMap {
  /** 标签创建完成。 @en A tag was created. */
  created: [content: string];
  /** 标签编辑完成。 @en A tag was edited. */
  edited: [content: string, oldValue: string, id?: TagId];
  /** 标签关闭完成。 @en A tag was closed. */
  closed: [id?: TagId];
  /** 展开状态变化。 @en Expanded state changed. */
  toggled: [expanded: boolean];
  /** 标签超出容器。 @en Tags exceeded the available space. */
  exceeded: [];
}

export interface TagRegionMap {
  /** 标签文字内容。 @en Tag label content. */
  content: EmptyComponentApi;
  /** 图标内容。 @en Icon content. */
  icon: { color?: string };
  /** 头像内容。 @en Avatar content. */
  avatar: EmptyComponentApi;
  /** Tooltip 内容。 @en Tooltip content. */
  tooltipContent: EmptyComponentApi;
}

export interface TagGroupRegionMap {
  /** 标签列表。 @en Tag list. */
  content: EmptyComponentApi;
  /** 创建文字。 @en Create action label. */
  createText: { tags: readonly TagCommonProps[] };
  /** 自定义创建操作。 @en Custom create action. */
  create: { tags: readonly TagCommonProps[] };
  /** 组前内容，不参与折叠。 @en Content before the group, excluded from collapse. */
  prepend: EmptyComponentApi;
  /** 组后内容，不参与折叠。 @en Content after the group, excluded from collapse. */
  append: EmptyComponentApi;
  /** 容器前置内容，参与折叠。 @en Leading container content included in collapse. */
  prefix: EmptyComponentApi;
  /** 容器后置内容，参与折叠。 @en Trailing container content included in collapse. */
  suffix: EmptyComponentApi;
}

export interface TagCommandMap {
  /** 进入编辑状态。 @en Enters edit mode. */
  edit: (content?: string) => void;
}

export interface TagGroupCommandMap {
  /** 设置或切换展开状态。 @en Sets or toggles the expanded state. */
  toggle: (expanded?: boolean) => void;
  /** 重新计算折叠布局。 @en Recalculates the collapsed layout. */
  calculate: () => void | Promise<void>;
}

export function isTagVariant(value: unknown): value is TagVariant {
  return typeof value === 'string' && TAG_VARIANTS.includes(value as TagVariant);
}

export function isTagSize(value: unknown): value is TagSize {
  return typeof value === 'string' && TAG_SIZES.includes(value as TagSize);
}

export function isTagTooltipRenderType(value: unknown): value is TagTooltipRenderType {
  return (
    typeof value === 'string' && TAG_TOOLTIP_RENDER_TYPES.includes(value as TagTooltipRenderType)
  );
}

export function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

const optionalBoolean = { runtimeType: 'boolean', type: 'boolean' } as const;

export const TAG_PROP_DEFINITIONS = defineComponentPropDefinitions<TagCommonProps>()({
  id: {
    runtimeType: ['string', 'number'],
    type: 'TagId',
    description: { zh: '标签标识符', en: 'Tag identifier' },
  },
  active: {
    ...optionalBoolean,
    description: { zh: '受控激活状态', en: 'Controlled active state' },
  },
  variant: {
    runtimeType: 'string',
    type: 'TagVariant',
    description: { zh: '视觉类型', en: 'Visual variant' },
    default: '',
    validator: isTagVariant,
  },
  size: {
    runtimeType: 'string',
    type: 'TagSize',
    description: { zh: '尺寸', en: 'Size' },
    default: 'medium',
    validator: isTagSize,
  },
  bold: { ...optionalBoolean, description: { zh: '加粗', en: 'Bold content' }, default: false },
  clickable: {
    ...optionalBoolean,
    description: { zh: '允许操作', en: 'Clickable' },
    default: true,
  },
  closable: { ...optionalBoolean, description: { zh: '允许关闭', en: 'Closable' }, default: false },
  editable: { ...optionalBoolean, description: { zh: '允许编辑', en: 'Editable' }, default: false },
  disabled: { ...optionalBoolean, description: { zh: '禁用', en: 'Disabled' }, default: false },
  plain: {
    ...optionalBoolean,
    description: { zh: '线性外观', en: 'Plain treatment' },
    default: false,
  },
  round: {
    ...optionalBoolean,
    description: { zh: '圆角外观', en: 'Rounded appearance' },
    default: false,
  },
  avatar: {
    runtimeType: 'string',
    type: 'string',
    description: { zh: '头像地址', en: 'Avatar URL' },
  },
  equally: {
    ...optionalBoolean,
    description: { zh: '等宽等高', en: 'Equal dimensions' },
    default: false,
  },
  showCloseDelay: {
    runtimeType: 'number',
    type: 'number',
    description: { zh: '关闭按钮显示延迟', en: 'Close-action delay' },
    default: 1000,
  },
  color: {
    runtimeType: 'string',
    type: 'string',
    description: { zh: '基础颜色', en: 'Base color' },
  },
  background: {
    runtimeType: 'string',
    type: 'string',
    description: { zh: '背景颜色', en: 'Background color' },
  },
  loading: {
    ...optionalBoolean,
    description: { zh: '加载状态', en: 'Loading state' },
    default: false,
  },
  tooltip: {
    runtimeType: ['string', 'boolean'],
    type: 'string | boolean',
    description: { zh: '提示文字或启用状态', en: 'Tooltip text or enablement' },
  },
  tooltipShowAfter: {
    runtimeType: 'number',
    type: 'number',
    description: { zh: '提示显示延迟', en: 'Tooltip show delay' },
    default: 200,
  },
  tooltipHideAfter: {
    runtimeType: 'number',
    type: 'number',
    description: { zh: '提示隐藏延迟', en: 'Tooltip hide delay' },
    default: 200,
  },
  disableTransitions: {
    ...optionalBoolean,
    description: { zh: '禁用过渡', en: 'Disable transitions' },
    default: false,
  },
  pure: {
    ...optionalBoolean,
    description: { zh: '只渲染内容', en: 'Content-only rendering' },
    default: false,
  },
});

export const TAG_GROUP_PROP_DEFINITIONS = defineComponentPropDefinitions<TagGroupCommonProps>()({
  size: {
    runtimeType: 'string',
    type: 'TagSize',
    description: { zh: '组内尺寸', en: 'Grouped size' },
    default: 'medium',
    validator: isTagSize,
  },
  editable: { ...optionalBoolean, description: { zh: '组内可编辑', en: 'Grouped editable state' } },
  disabled: { ...optionalBoolean, description: { zh: '组内禁用', en: 'Grouped disabled state' } },
  collapse: {
    ...optionalBoolean,
    description: { zh: '折叠溢出标签', en: 'Collapse overflow' },
    default: true,
  },
  expand: {
    ...optionalBoolean,
    description: { zh: '允许展开', en: 'Allow expansion' },
    default: false,
  },
  collapseUseTooltip: {
    ...optionalBoolean,
    description: { zh: '折叠提示', en: 'Collapsed tooltip' },
    default: true,
  },
  tooltipRenderType: {
    runtimeType: 'string',
    type: 'TagTooltipRenderType',
    description: { zh: '提示内容方式', en: 'Tooltip content mode' },
    default: 'innerText',
    validator: isTagTooltipRenderType,
  },
  separator: {
    runtimeType: 'string',
    type: 'string',
    description: { zh: '隐藏标签分隔符', en: 'Hidden-label separator' },
    default: '、',
  },
  useCreate: {
    ...optionalBoolean,
    description: { zh: '启用创建', en: 'Enable creation' },
    default: false,
  },
  beforeCreate: {
    runtimeType: 'function',
    type: '(content: string) => TagGuardResult',
    description: { zh: '创建前守卫', en: 'Create guard' },
  },
  beforeEdit: {
    runtimeType: 'function',
    type: '(content: string, oldValue: string, id?: TagId) => TagGuardResult',
    description: { zh: '编辑前守卫', en: 'Edit guard' },
  },
  beforeClose: {
    runtimeType: 'function',
    type: '(id?: TagId) => TagGuardResult',
    description: { zh: '关闭前守卫', en: 'Close guard' },
  },
  createText: {
    runtimeType: 'string',
    type: 'string',
    description: { zh: '创建操作文字', en: 'Create action label' },
  },
  maxTags: {
    runtimeType: 'number',
    type: 'number',
    description: { zh: '最大标签数量', en: 'Maximum tags' },
    default: Number.POSITIVE_INFINITY,
  },
  disableTransitions: {
    ...optionalBoolean,
    description: { zh: '禁用过渡', en: 'Disable transitions' },
    default: false,
  },
  fillUp: {
    ...optionalBoolean,
    description: { zh: '填满容器', en: 'Fill available width' },
    default: false,
  },
  minDisplayed: {
    runtimeType: 'number',
    type: 'number',
    description: { zh: '最少展示数量', en: 'Minimum visible count' },
    validator: isNonNegativeNumber,
  },
  tooltipShowAfter: {
    runtimeType: 'number',
    type: 'number',
    description: { zh: '提示显示延迟', en: 'Tooltip show delay' },
  },
  tooltipHideAfter: {
    runtimeType: 'number',
    type: 'number',
    description: { zh: '提示隐藏延迟', en: 'Tooltip hide delay' },
  },
});

export const TAG_DEFAULTS = createComponentPropDefaults(TAG_PROP_DEFINITIONS);
export const TAG_GROUP_DEFAULTS = createComponentPropDefaults(TAG_GROUP_PROP_DEFINITIONS);

export const tagApiContract = defineComponentApiContract<
  TagCommonProps,
  TagEventMap,
  TagRegionMap,
  TagCommandMap
>({
  defaults: TAG_DEFAULTS,
  validators: createComponentPropValidators<TagCommonProps>(TAG_PROP_DEFINITIONS),
  propDefinitions: TAG_PROP_DEFINITIONS,
});

export const tagGroupApiContract = defineComponentApiContract<
  TagGroupCommonProps,
  TagGroupEventMap,
  TagGroupRegionMap,
  TagGroupCommandMap
>({
  defaults: TAG_GROUP_DEFAULTS,
  validators: createComponentPropValidators<TagGroupCommonProps>(TAG_GROUP_PROP_DEFINITIONS),
  propDefinitions: TAG_GROUP_PROP_DEFINITIONS,
});
