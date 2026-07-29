import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

export type HTabSize = 'small' | 'medium' | 'large' | 'huge';

export type HTabValue = string | number;

/** @deprecated: 已过时，请使用 `Segmented` 组件替代 */
export type Segment = 'segment';
export type HTabType = 'line' | 'card' | Segment | 'page';

export const useTabsProps = declarePropType({
  /**
   * 绑定值，表示当前选中的是哪个选项卡
   * @deprecated `activeKey`
    * @en Configuration for model value.
   * */
  modelValue: {
    type: [String, Number] as PropType<HTabValue>,
    required: false,
  },

  /**
   * 当前选中的选项卡的 key，支持 `v-model:active-key`
    * @en Configuration for active key.
   **/
  activeKey: {
    type: [String, Number] as PropType<HTabValue>,
    required: false,
  },

  /**
   * 启用 `v2.x.x` 版本逻辑
    * @en Configuration for v2.
   **/
  v2: {
    type: Boolean,
  },

  /**
   * 默认选中的选项卡的key（非受控状态，为空时选中第一个选项卡页）
    * @en Configuration for default active key.
   **/
  defaultActiveKey: {
    type: [String, Number] as PropType<HTabValue>,
    required: false,
  },

  /**
   * 选项卡尺寸大小，当 `type=page`, 该选项无效
    * @en Configuration for size.
   **/
  size: {
    type: String as PropType<HTabSize>,
  },

  /**
   * 选项卡可拖拽改变位置
    * @en Configuration for draggable.
   **/
  draggable: {
    type: Boolean,
    default: false,
  },

  // /**
  //  * 是否启用拖拽过渡
  //  **/
  // draggableTransition: {
  //   type: Boolean,
  //   default: true,
  // },

  /**
   * 当元素过多时候，选项卡可滑动
    * @en Configuration for scrollable.
   **/
  scrollable: {
    type: Boolean,
    default: true,
  },

  /**
   * 当元素选中时候，选项卡是否滑动到目标元素
    * @en Configuration for focusable.
   **/
  focusable: {
    type: Boolean,
    default: true,
  },

  /**
   * 当页签超长的时候，是否使用箭头
    * @en Configuration for arrow.
   **/
  arrow: {
    type: Boolean,
    default: true,
  },

  /**
   * 选项卡类型, `type=segment` 已过时，请使用 `HSegmented` 替代
    * @en Configuration for type.
   **/
  type: {
    type: String as PropType<HTabType>,
    default: 'line',
  },

  /**
   * 是否显示水平分割线, 当 `type=line` 生效，使用 `underline` 替代
   * @deprecated `underline`
    * @en Configuration for show underline.
   **/
  showUnderline: {
    type: Boolean,
    default: undefined,
  },

  /**
   * 是否显示水平分割线, 当 `type=line` 生效
    * @en Configuration for underline.
   **/
  underline: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否展示指示器，当 `type=line` 生效
    * @en Configuration for indicator.
   */
  indicator: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否显示新增按钮，当 `type=segment` 不生效, 使用 `editable` 替代
   * @deprecated `editable`
    * @en Configuration for show add.
   */
  showAdd: {
    type: Boolean,
    default: undefined,
  },

  /**
   * 是否显示新增按钮，当 `type=segment` 不生效
    * @en Configuration for editable.
   */
  editable: {
    type: Boolean,
  },

  /**
   * 切换前的回调函数
   * key: 待切换到的 tab 的 key
   * 旧版本： change: 你需要手动调用 change() 来执行切换
   * v2: 当 `v2` 启用时候，beforeChange 返回 Promise<false>/false 来取消跳转
    * @en Configuration for before change.
   */
  beforeChange: {
    type: Function as PropType<(key: HTabValue, change?: () => void) => PromiseLike<boolean>>,
    required: false,
  },
});

export const useTabProps = declarePropType({
  /**
   * 选项卡的名称，需要唯一，请使用 `key` 替代
   * @deprecated `key`
    * @en Configuration for name.
   */
  name: {
    type: [String, Number] as PropType<HTabValue>,
    required: false,
  },

  /**
   * 选项卡显示名称
    * @en Configuration for label.
   **/
  label: {
    type: [String, Number] as PropType<HTabValue>,
  },

  /** 图标名字，为空表示没有图标
   * @en Configuration for icon.
 */
  icon: {
    type: String,
    default: '',
  },

  /** 图标大小
   * @en Configuration for icon size.
 */
  iconSize: {
    type: [String, Number] as PropType<HTabValue>,
  },

  /**
   * 是否禁用选项卡，当 `type=page` 不生效
    * @en Configuration for disabled.
   **/
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否显示关闭按钮，当 `type=segment` 类型的选项卡不生效，请使用 `closable` 替代
   * @deprecated `closable`
    * @en Configuration for show close.
   **/
  showClose: {
    type: Boolean,
    default: undefined,
  },

  /**
   * 是否显示关闭按钮，当 `type=segment` 类型的选项卡不生效
    * @en Configuration for closable.
   **/
  closable: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否可拖拽
    * @en Configuration for draggable.
   */
  draggable: {
    type: Boolean,
    default: true,
  },

  /**
   * 最小宽度，（请不要使用）
   * @deprecated 请直接设置 `HTab.style` 来控制宽度d
    * @en Configuration for min width.
   **/
  minWidth: {
    type: [String, Number],
  },

  /**
   * 最大宽度，超出的文本会自动截断（请不要使用）
   * @deprecated 请直接设置 `HTab.style` 来控制宽度
    * @en Configuration for max width.
   **/
  maxWidth: {
    type: [String, Number],
  },
});

export type TabsProps = ExtractPropTypes<typeof useTabsProps>;
export type TabProps = ExtractPropTypes<typeof useTabProps>;
