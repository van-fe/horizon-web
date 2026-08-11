import type { ExtractPropTypes, PropType } from 'vue';
import type {
  AdaptComponentApiShape,
  CollapseCommonProps,
  CollapseDirective,
  CollapseIconPosition,
  CollapseItemCommonProps,
  CollapseKey,
  CollapseSize,
  CollapseValue,
  ComponentRendererPropDefinitions,
} from '@aurora/core';
import {
  COLLAPSE_DEFAULTS,
  COLLAPSE_ITEM_DEFAULTS,
  isCollapseDirective,
  isCollapseIconPosition,
  isCollapseKey,
  isCollapseSize,
} from '@aurora/core';
import { declarePropType } from '@aurora/utils';

type CollapseVueProps = AdaptComponentApiShape<
  CollapseCommonProps,
  { value: 'activeKey' },
  'defaultValue'
>;

export const useCollapseProps = declarePropType({
  /** 当前展开项。 @en Expanded panels. */
  activeKey: {
    type: [String, Number, Array] as PropType<CollapseValue>,
    required: false,
  },
  /** 同一时间仅允许一个面板展开。 @en Allows only one expanded panel. */
  accordion: { type: Boolean, default: COLLAPSE_DEFAULTS.accordion },
  /** 使用边框外观。 @en Uses the bordered appearance. */
  border: { type: Boolean, default: COLLAPSE_DEFAULTS.border },
  /** 使用填充外观。 @en Uses the filled appearance. */
  filled: { type: Boolean, default: COLLAPSE_DEFAULTS.filled },
  /** 展开图标位置。 @en Expand-icon position. */
  expandIconPosition: {
    type: String as PropType<CollapseIconPosition>,
    default: COLLAPSE_DEFAULTS.expandIconPosition,
    validator: isCollapseIconPosition,
  },
  /** 组件尺寸；未设置时继承 Application。 @en Component size; inherits Application when omitted. */
  size: { type: String as PropType<CollapseSize>, required: false, validator: isCollapseSize },
  /** 初始展开全部非禁用面板。 @en Initially expands every enabled panel. */
  expandAll: { type: Boolean, default: COLLAPSE_DEFAULTS.expandAll },
} satisfies ComponentRendererPropDefinitions<CollapseVueProps>);

type CollapseItemVueProps = CollapseItemCommonProps<string, string>;

export const useCollapseItemProps = declarePropType({
  /** 面板标题。 @en Panel title. */
  title: { type: String, required: false },
  /** 面板唯一标识。 @en Unique panel key. */
  name: {
    type: [String, Number] as PropType<CollapseKey>,
    required: true,
    validator: isCollapseKey,
  },
  /** 禁用面板交互。 @en Disables panel interaction. */
  disabled: { type: Boolean, default: COLLAPSE_ITEM_DEFAULTS.disabled },
  /** 展开图标。 @en Expand icon. */
  expandIcon: { type: String, required: false },
  /** 分隔线颜色。 @en Divider color. */
  color: { type: String, required: false },
  /** 标题背景色。 @en Header background color. */
  background: { type: String, required: false },
  /** 正文挂载策略。 @en Body persistence strategy. */
  directive: {
    type: String as PropType<CollapseDirective>,
    default: COLLAPSE_ITEM_DEFAULTS.directive,
    validator: isCollapseDirective,
  },
} satisfies ComponentRendererPropDefinitions<CollapseItemVueProps>);

export type CollapseProps = ExtractPropTypes<typeof useCollapseProps>;
export type CollapseItemProps = ExtractPropTypes<typeof useCollapseItemProps>;
