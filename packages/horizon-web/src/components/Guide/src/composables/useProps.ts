import type { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useGuideProps = declarePropType({
  /**
   * 当前步骤
    * @en Configuration for model value.
   */
  modelValue: {
    type: Number,
    default: -1,
  },
  /**
   * 是否显示
    * @en Configuration for visible.
   */
  visible: {
    type: Boolean,
    default: false,
  },
  /**
   * 类型
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<'default' | 'primary'>,
    default: 'default',
  },
  /**
   * 卡片相对于目标元素的位置
    * @en Configuration for placement.
   */
  placement: {
    type: String as PropType<
      | 'left'
      | 'top-start'
      | 'top-end'
      | 'bottom-start'
      | 'bottom-end'
      | 'right-start'
      | 'right-end'
      | 'left-start'
      | 'left-end'
      | 'top'
      | 'bottom'
      | 'right'
    >,
    default: 'top',
  },
  /**
   * 是否显示箭头
    * @en Configuration for arrow.
   */
  arrow: {
    type: Boolean,
    default: true,
  },
  /**
   * 在主方向上的偏移
    * @en Configuration for distance.
   */
  distance: {
    type: Number,
    default: 8,
  },
  /**
   * 在辅助方向上的的偏移
    * @en Configuration for skidding.
   */
  skidding: {
    type: Number,
    default: 0,
  },
  /**
   * 当原本的显示位置空间不够时，是否允许显示到对面的位置
    * @en Configuration for flip.
   */
  flip: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否使用控制按钮
    * @en Configuration for use controls.
   */
  useControls: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否启用蒙层
    * @en Configuration for mask.
   */
  mask: {
    type: Boolean,
    default: true,
  },
  /**
   * 蒙层聚焦内容留白的内边距
    * @en Configuration for mask trigger padding.
   */
  maskTriggerPadding: {
    type: Number,
    default: 8,
  },
  /**
   * 蒙层的类
    * @en Configuration for mask class.
   */
  maskClass: {
    type: String,
  },
  /**
   * 蒙层的样式
    * @en Configuration for mask style.
   */
  maskStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 是否在激活步骤时，自动滚动到元素所在位置
    * @en Configuration for scroll into view.
   */
  scrollIntoView: {
    type: [Boolean, Object] as PropType<boolean | ScrollIntoViewOptions>,
    default: true,
  },
  /**
   * 层级
    * @en Configuration for z index.
   */
  zIndex: {
    type: Number,
  },
  /**
   * 是否显示关闭按钮
    * @en Configuration for closable.
   */
  closable: {
    type: Boolean,
    default: true,
  },
  /**
   * 如果不通过 `guide-item` 创建，可以直接传入相应参数
    * @en Configuration for item list.
   */
  itemList: {
    type: Array as PropType<Array<ExtractPropTypes<GuideItemProps>>>,
  },
  /**
   * 完成按钮文本
   * @verison latest
    * @en Configuration for finish text.
   */
  finishText: {
    type: String,
    default: undefined,
  },
  /**
   * 是否可拖拽引导弹窗
   * @verison latest
    * @en Configuration for draggable.
   */
  draggable: {
    type: Boolean,
    default: false,
  },
});

export const useGuideItemProps = declarePropType({
  /**
   * 当前步骤的下标，如果不设置，则按照挂载顺序依次排序
    * @en Configuration for index.
   */
  index: {
    type: Number,
  },
  /**
   * 目标元素，如果为空或无法找到元素，则以全局居中位置显示
    * @en Configuration for target.
   */
  target: {
    type: [String, Object] as PropType<string | HTMLElement>,
  },
  /**
   * 标题
    * @en Configuration for title.
   */
  title: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 配图地址
    * @en Configuration for image.
   */
  image: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 正文内容
    * @en Configuration for content.
   */
  content: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 类型
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<'default' | 'primary'>,
  },
  /**
   * 卡片相对于目标元素的位置
    * @en Configuration for placement.
   */
  placement: {
    type: String as PropType<
      | 'left'
      | 'top-start'
      | 'top-end'
      | 'bottom-start'
      | 'bottom-end'
      | 'right-start'
      | 'right-end'
      | 'left-start'
      | 'left-end'
      | 'top'
      | 'bottom'
      | 'right'
    >,
  },
  /**
   * 是否显示箭头
    * @en Configuration for arrow.
   */
  arrow: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 在主方向上的偏移
    * @en Configuration for distance.
   */
  distance: {
    type: Number,
  },
  /**
   * 在辅助方向上的的偏移
    * @en Configuration for skidding.
   */
  skidding: {
    type: Number,
  },
  /**
   * 当原本的显示位置空间不够时，是否允许显示到对面的位置
    * @en Configuration for flip.
   */
  flip: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否使用控制按钮
    * @en Configuration for use controls.
   */
  useControls: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否启用蒙层
    * @en Configuration for mask.
   */
  mask: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 蒙层聚焦内容留白的内边距
    * @en Configuration for mask trigger padding.
   */
  maskTriggerPadding: {
    type: Number,
  },
  /**
   * 蒙层的类
    * @en Configuration for mask class.
   */
  maskClass: {
    type: String,
  },
  /**
   * 蒙层的样式
    * @en Configuration for mask style.
   */
  maskStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 是否在激活步骤时，自动滚动到元素所在位置
    * @en Configuration for scroll into view.
   */
  scrollIntoView: {
    type: [Boolean, Object] as PropType<boolean | ScrollIntoViewOptions>,
    default: undefined,
  },
  /**
   * 是否显示关闭按钮
    * @en Configuration for closable.
   */
  closable: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 完成按钮文本
   * @verison latest
    * @en Configuration for finish text.
   */
  finishText: {
    type: String,
    default: undefined,
  },
  /**
   * 是否可拖拽引导弹窗
   * @verison latest
    * @en Configuration for draggable.
   */
  draggable: {
    type: Boolean,
    default: false,
  },
});

export type GuideProps = ExtractPropTypes<typeof useGuideProps>;
export type GuideItemProps = ExtractPropTypes<typeof useGuideItemProps>;
