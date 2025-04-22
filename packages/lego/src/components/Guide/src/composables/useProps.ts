import type { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue';
import { declarePropType } from '@nio-fe/shared';

export const useGuideProps = declarePropType({
  /**
   * 当前步骤
   */
  modelValue: {
    type: Number,
    default: -1,
  },
  /**
   * 是否显示
   */
  visible: {
    type: Boolean,
    default: false,
  },
  /**
   * 类型
   */
  type: {
    type: String as PropType<'default' | 'primary'>,
    default: 'default',
  },
  /**
   * 卡片相对于目标元素的位置
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
   */
  arrow: {
    type: Boolean,
    default: true,
  },
  /**
   * 在主方向上的偏移
   */
  distance: {
    type: Number,
    default: 8,
  },
  /**
   * 在辅助方向上的的偏移
   */
  skidding: {
    type: Number,
    default: 0,
  },
  /**
   * 当原本的显示位置空间不够时，是否允许显示到对面的位置
   */
  flip: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否使用控制按钮
   */
  useControls: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否启用蒙层
   */
  mask: {
    type: Boolean,
    default: true,
  },
  /**
   * 蒙层聚焦内容留白的内边距
   */
  maskTriggerPadding: {
    type: Number,
    default: 8,
  },
  /**
   * 蒙层的类
   */
  maskClass: {
    type: String,
  },
  /**
   * 蒙层的样式
   */
  maskStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 是否在激活步骤时，自动滚动到元素所在位置
   */
  scrollIntoView: {
    type: [Boolean, Object] as PropType<boolean | ScrollIntoViewOptions>,
    default: true,
  },
  /**
   * 层级
   */
  zIndex: {
    type: Number,
  },
  /**
   * 是否显示关闭按钮
   */
  closable: {
    type: Boolean,
    default: true,
  },
  /**
   * 如果不通过 `guide-item` 创建，可以直接传入相应参数
   */
  itemList: {
    type: Array as PropType<Array<ExtractPropTypes<GuideItemProps>>>,
  },
  /**
   * 完成按钮文本
   * @verison latest
   */
  finishText: {
    type: String,
    default: undefined,
  },
  /**
   * 是否可拖拽引导弹窗
   * @verison latest
   */
  draggable: {
    type: Boolean,
    default: false,
  },
});

export const useGuideItemProps = declarePropType({
  /**
   * 当前步骤的下标，如果不设置，则按照挂载顺序依次排序
   */
  index: {
    type: Number,
  },
  /**
   * 目标元素，如果为空或无法找到元素，则以全局居中位置显示
   */
  target: {
    type: [String, Object] as PropType<string | HTMLElement>,
  },
  /**
   * 标题
   */
  title: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 配图地址
   */
  image: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 正文内容
   */
  content: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 类型
   */
  type: {
    type: String as PropType<'default' | 'primary'>,
  },
  /**
   * 卡片相对于目标元素的位置
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
   */
  arrow: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 在主方向上的偏移
   */
  distance: {
    type: Number,
  },
  /**
   * 在辅助方向上的的偏移
   */
  skidding: {
    type: Number,
  },
  /**
   * 当原本的显示位置空间不够时，是否允许显示到对面的位置
   */
  flip: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否使用控制按钮
   */
  useControls: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否启用蒙层
   */
  mask: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 蒙层聚焦内容留白的内边距
   */
  maskTriggerPadding: {
    type: Number,
  },
  /**
   * 蒙层的类
   */
  maskClass: {
    type: String,
  },
  /**
   * 蒙层的样式
   */
  maskStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 是否在激活步骤时，自动滚动到元素所在位置
   */
  scrollIntoView: {
    type: [Boolean, Object] as PropType<boolean | ScrollIntoViewOptions>,
    default: undefined,
  },
  /**
   * 是否显示关闭按钮
   */
  closable: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 完成按钮文本
   * @verison latest
   */
  finishText: {
    type: String,
    default: undefined,
  },
  /**
   * 是否可拖拽引导弹窗
   * @verison latest
   */
  draggable: {
    type: Boolean,
    default: false,
  },
});

export type GuideProps = ExtractPropTypes<typeof useGuideProps>;
export type GuideItemProps = ExtractPropTypes<typeof useGuideItemProps>;
