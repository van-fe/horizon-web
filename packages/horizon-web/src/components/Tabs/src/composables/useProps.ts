import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

export type NTabSize = 'small' | 'medium' | 'large' | 'huge';

export type NTabValue = string | number;

/** @deprecated: 已过时，请使用 `Segmented` 组件替代 */
export type Segment = 'segment';
export type NTabType = 'line' | 'card' | Segment | 'page';

export const useTabsProps = declarePropType({
  /**
   * 绑定值，表示当前选中的是哪个选项卡
   * @deprecated `activeKey`
   * */
  modelValue: {
    type: [String, Number] as PropType<NTabValue>,
    required: false,
  },

  /**
   * 当前选中的选项卡的 key，支持 `v-model:active-key`
   * @version 2.0.16
   **/
  activeKey: {
    type: [String, Number] as PropType<NTabValue>,
    required: false,
  },

  /**
   * 启用 `v2.x.x` 版本逻辑
   * @version 2.0.16
   **/
  v2: {
    type: Boolean,
  },

  /**
   * 默认选中的选项卡的key（非受控状态，为空时选中第一个选项卡页）
   * @version 2.0.16
   **/
  defaultActiveKey: {
    type: [String, Number] as PropType<NTabValue>,
    required: false,
  },

  /**
   * 选项卡尺寸大小，当 `type=page`, 该选项无效
   **/
  size: {
    type: String as PropType<NTabSize>,
  },

  /**
   * 选项卡可拖拽改变位置
   * @version 2.0.16
   **/
  draggable: {
    type: Boolean,
    default: false,
  },

  // /**
  //  * 是否启用拖拽过渡
  //  * @version 2.0.16
  //  **/
  // draggableTransition: {
  //   type: Boolean,
  //   default: true,
  // },

  /**
   * 当元素过多时候，选项卡可滑动
   * @version 2.0.16
   **/
  scrollable: {
    type: Boolean,
    default: true,
  },

  /**
   * 当元素选中时候，选项卡是否滑动到目标元素
   * @version 2.0.16
   **/
  focusable: {
    type: Boolean,
    default: true,
  },

  /**
   * 当页签超长的时候，是否使用箭头
   * @version 2.0.16
   **/
  arrow: {
    type: Boolean,
    default: true,
  },

  /**
   * 选项卡类型, `type=segment` 已过时，请使用 `NSegmented` 替代
   * @version 2.7.0
   **/
  type: {
    type: String as PropType<NTabType>,
    default: 'line',
  },

  /**
   * 是否显示水平分割线, 当 `type=line` 生效，使用 `underline` 替代
   * @deprecated `underline`
   **/
  showUnderline: {
    type: Boolean,
    default: undefined,
  },

  /**
   * 是否显示水平分割线, 当 `type=line` 生效
   * @version 2.0.16
   **/
  underline: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否展示指示器，当 `type=line` 生效
   * @version 2.7.0
   */
  indicator: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否显示新增按钮，当 `type=segment` 不生效, 使用 `editable` 替代
   * @deprecated `editable`
   */
  showAdd: {
    type: Boolean,
    default: undefined,
  },

  /**
   * 是否显示新增按钮，当 `type=segment` 不生效
   * @version 2.0.16
   */
  editable: {
    type: Boolean,
  },

  /**
   * 切换前的回调函数
   * key: 待切换到的 tab 的 key
   * 旧版本： change: 你需要手动调用 change() 来执行切换
   * v2: 当 `v2` 启用时候，beforeChange 返回 Promise<false>/false 来取消跳转
   */
  beforeChange: {
    type: Function as PropType<(key: NTabValue, change?: () => void) => PromiseLike<boolean>>,
    required: false,
  },
});

export const useTabProps = declarePropType({
  /**
   * 选项卡的名称，需要唯一，请使用 `key` 替代
   * @deprecated `key`
   */
  name: {
    type: [String, Number] as PropType<NTabValue>,
    required: false,
  },

  /**
   * 选项卡显示名称
   **/
  label: {
    type: [String, Number] as PropType<NTabValue>,
  },

  /** 图标名字，为空表示没有图标 */
  icon: {
    type: String,
    default: '',
  },

  /** 图标大小 */
  iconSize: {
    type: [String, Number] as PropType<NTabValue>,
  },

  /**
   * 是否禁用选项卡，当 `type=page` 不生效
   **/
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否显示关闭按钮，当 `type=segment` 类型的选项卡不生效，请使用 `closable` 替代
   * @deprecated `closable`
   **/
  showClose: {
    type: Boolean,
    default: undefined,
  },

  /**
   * 是否显示关闭按钮，当 `type=segment` 类型的选项卡不生效
   * @version 2.0.16
   **/
  closable: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否可拖拽
   * @version 2.0.16
   */
  draggable: {
    type: Boolean,
    default: true,
  },

  /**
   * 最小宽度，（请不要使用）
   * @deprecated 请直接设置 `NTab.style` 来控制宽度d
   **/
  minWidth: {
    type: [String, Number],
  },

  /**
   * 最大宽度，超出的文本会自动截断（请不要使用）
   * @deprecated 请直接设置 `NTab.style` 来控制宽度
   **/
  maxWidth: {
    type: [String, Number],
  },
});

export type TabsProps = ExtractPropTypes<typeof useTabsProps>;
export type TabProps = ExtractPropTypes<typeof useTabProps>;
