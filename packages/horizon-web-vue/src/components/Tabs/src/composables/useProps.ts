import type { ExtractPropTypes, PropType } from 'vue';
import type {
  AdaptComponentApiShape,
  ComponentRendererPropDefinitions,
  TabCommonProps,
  TabsCommonProps,
  TabsKey,
  TabsSize,
  TabsVariant,
} from '@aurora/core';
import { isTabsKey, isTabsSize, isTabsVariant, TAB_DEFAULTS, TABS_DEFAULTS } from '@aurora/core';
import { declarePropType } from '@aurora/utils';

export type HTabValue = TabsKey;
export type HTabSize = TabsSize;
export type HTabType = TabsVariant;

type TabsVueProps = AdaptComponentApiShape<
  TabsCommonProps,
  { value: 'activeKey'; defaultValue: 'defaultActiveKey'; variant: 'type' }
>;

export const useTabsProps = declarePropType({
  /** 当前选中项。 @en Controlled selected tab. */
  activeKey: { type: [String, Number] as PropType<TabsKey>, required: false, validator: isTabsKey },
  /** 非受控初始选中项。 @en Initial uncontrolled selected tab. */
  defaultActiveKey: {
    type: [String, Number] as PropType<TabsKey>,
    required: false,
    validator: isTabsKey,
  },
  /** 组件尺寸；未设置时继承 Application。 @en Component size; inherits Application when omitted. */
  size: { type: String as PropType<TabsSize>, required: false, validator: isTabsSize },
  /** 允许拖拽排序。 @en Enables drag reordering. */
  draggable: { type: Boolean, default: TABS_DEFAULTS.draggable },
  /** 允许溢出导航滚动。 @en Enables overflow navigation. */
  scrollable: { type: Boolean, default: TABS_DEFAULTS.scrollable },
  /** 切换后将选中项移入视口。 @en Brings the selected tab into view. */
  focusable: { type: Boolean, default: TABS_DEFAULTS.focusable },
  /** 溢出时展示导航箭头。 @en Shows overflow navigation arrows. */
  arrow: { type: Boolean, default: TABS_DEFAULTS.arrow },
  /** 外观类型。 @en Presentation variant. */
  type: {
    type: String as PropType<TabsVariant>,
    default: TABS_DEFAULTS.variant,
    validator: (value: unknown) => value === 'segmented' || isTabsVariant(value),
  },
  /** 展示底部分割线。 @en Shows the bottom divider. */
  underline: { type: Boolean, default: TABS_DEFAULTS.underline },
  /** 展示选中指示器。 @en Shows the selection indicator. */
  indicator: { type: Boolean, default: TABS_DEFAULTS.indicator },
  /** 展示新增操作。 @en Shows the add action. */
  editable: { type: Boolean, default: TABS_DEFAULTS.editable },
  /** 切换前守卫。 @en Guard invoked before selection changes. */
  beforeChange: {
    type: Function as PropType<NonNullable<TabsCommonProps['beforeChange']>>,
    required: false,
  },
} satisfies ComponentRendererPropDefinitions<TabsVueProps>);

type TabVueProps = AdaptComponentApiShape<TabCommonProps<string | number, string>, {}, 'value'>;

export const useTabProps = declarePropType({
  /** 条目文本。 @en Tab label. */
  label: { type: [String, Number] as PropType<TabsKey>, required: false },
  /** 图标名称。 @en Icon name. */
  icon: { type: String, default: TAB_DEFAULTS.icon },
  /** 图标尺寸。 @en Icon size. */
  iconSize: { type: [String, Number] as PropType<string | number>, required: false },
  /** 禁用条目。 @en Disables the tab. */
  disabled: { type: Boolean, default: TAB_DEFAULTS.disabled },
  /** 展示关闭操作。 @en Shows the close action. */
  closable: { type: Boolean, default: TAB_DEFAULTS.closable },
  /** 允许当前条目拖拽。 @en Allows this tab to be dragged. */
  draggable: { type: Boolean, default: TAB_DEFAULTS.draggable },
} satisfies ComponentRendererPropDefinitions<TabVueProps>);

export type TabsProps = ExtractPropTypes<typeof useTabsProps>;
export type TabProps = ExtractPropTypes<typeof useTabProps>;
