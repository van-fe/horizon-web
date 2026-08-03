import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

export type HTabSize = 'small' | 'medium' | 'large' | 'huge';

export type HTabValue = string | number;

export type HTabType = 'line' | 'card' | 'page';

export const useTabsProps = declarePropType({
  /**
   * 当前选中的选项卡的 key，支持 `v-model:active-key`
   * @en Configuration for active key.
   **/
  activeKey: {
    type: [String, Number] as PropType<HTabValue>,
    required: false,
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
   * 选项卡类型
   * @en Configuration for type.
   **/
  type: {
    type: String as PropType<HTabType>,
    default: 'line',
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
   * 是否显示新增按钮
   * @en Configuration for editable.
   */
  editable: {
    type: Boolean,
  },

  /**
   * 切换前的回调函数
   * key: 待切换到的 tab 的 key
   * 当 beforeChange 返回 Promise<false>/false 时取消跳转
   * @en Configuration for before change.
   */
  beforeChange: {
    type: Function as PropType<(key: HTabValue) => boolean | PromiseLike<boolean>>,
    required: false,
  },
});

export const useTabProps = declarePropType({
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
   * 是否显示关闭按钮
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
});

export type TabsProps = ExtractPropTypes<typeof useTabsProps>;
export type TabProps = ExtractPropTypes<typeof useTabProps>;
