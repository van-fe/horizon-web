import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@nio-fe/shared';

export const useCollapseProps = declarePropType({
  /**
   * 当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)
   */
  activeKey: {
    type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
    required: false,
  },
  /**
   * 是否手风琴模式
   */
  accordion: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 是否边框模式
   * @version 2.12.0
   */
  border: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 是否使用面分隔
   */
  filled: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 展开图标位置
   */
  expandIconPosition: {
    type: String as PropType<'left' | 'right'>,
    required: false,
    default: 'left',
  },
  /**
   * 面板大小
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /**
   * 默认展开全部(对手风琴模式无效)
   */
  expandAll: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
});

export const useCollapseItemProps = declarePropType({
  /**
   * 面板标题
   */
  title: {
    type: String,
    required: false,
  },
  /**
   * 唯一标志符
   */
  name: {
    type: [String, Number],
    required: true,
  },
  /**
   * 禁用
   */
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 自定义展开图标
   */
  expandIcon: {
    type: String,
    required: false,
  },
  /**
   * 分隔线颜色
   */
  color: {
    type: String,
    required: false,
  },
  /**
   * 面板标题背景色
   */
  background: {
    type: String,
    required: false,
  },
  /**
   * v-if和v-show
   */
  directive: {
    type: String as PropType<'show' | 'if'>,
    required: false,
    default: 'show',
  },
});

export type CollapseProps = ExtractPropTypes<typeof useCollapseProps>;
export type CollapseItemProps = ExtractPropTypes<typeof useCollapseItemProps>;
