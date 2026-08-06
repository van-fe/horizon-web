import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';

export const useDialogProps = declarePropType({
  /**
   * 控制对话框展示，支持 `v-model:visible`
   * @en Configuration for visible.
   */
  visible: {
    type: Boolean,
    default: false,
    required: false,
  },
  /**
   * 对话框标题
   * @en Configuration for title.
   */
  title: {
    type: String,
    required: false,
  },
  /**
   * 距顶部的距离
   * @en Configuration for top.
   */
  top: {
    type: [String, Number],
  },

  /**
   * 对话框图标名称
   * 当设置了 `title` 或插槽时，图标位置在 `title` 之前，否则图标在默认插槽之前
   * @en Configuration for icon name.
   */
  iconName: {
    type: String,
    required: false,
  },
  /**
   * 对话框图标颜色
   * 传入数组时按图标图形顺序分别设置颜色
   * @en Configuration for icon color.
   * Pass an array to color each icon shape in order.
   */
  iconColor: {
    type: [String, Array] as PropType<string | string[]>,
    required: false,
  },
  /**
   * 对话框尺寸
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<'medium' | 'small' | 'large' | 'huge'>,
    required: false,
  },
  /**
   * 是否显示蒙层
   * @en Configuration for mask.
   */
  mask: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 点击蒙层是否关闭对话框
   * @en Configuration for mask close.
   */
  maskClose: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 按下 ESC 键是否关闭对话框
   * @en Configuration for esc close.
   */
  escClose: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 是否显示右上角关闭按钮
   * 只有设置了 `title` 才会生效，如果你不想显示标题但又希望显示关闭按钮，可以将 `title` 设为空格
   * @en Configuration for close button.
   */
  closeButton: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 显示主要按钮以及设置按钮属性
   * @en Configuration for ok button props.
   */
  okButtonProps: {
    type: [Boolean, Object] as PropType<boolean | Partial<ButtonProps>>,
    default: () => ({}),
    required: false,
  },

  /**
   * 主要按钮的文本
   * @en Configuration for ok text.
   */
  okText: {
    type: String,
    required: false,
  },

  /**
   * 显示次要按钮以及设置按钮属性
   * @en Configuration for cancel button props.
   */
  cancelButtonProps: {
    type: [Boolean, Object] as PropType<boolean | Partial<ButtonProps>>,
    default: () => ({}),
    required: false,
  },
  /**
   * 辅助按钮的文本
   * @en Configuration for cancel text.
   */
  cancelText: {
    type: String,
    required: false,
  },

  /** 关闭之前的回调，会停止关闭对话框，除非手动调用传入的 `close` 方法。
   * @en Configuration for before close.
   */
  beforeClose: {
    type: Function as PropType<(close: () => void) => void>,
    required: false,
  },
  /**
   * 是否在关闭时销毁对话框
   * @en Configuration for destroy on close.
   */
  destroyOnClose: {
    type: Boolean,
    default: false,
  },

  /** CSS 层级
   * @en Configuration for z index.
   */
  zIndex: {
    type: Number,
    required: false,
  },
  /**
   * 挂载节点
   * @en Configuration for to.
   */
  to: {
    type: [String, Object] as PropType<string | HTMLElement | null>,
    required: false,
    default: 'body',
  },

  /**
   * 是否在 `Dialog` 出现时将 `body` 滚动锁定
   * @en Configuration for lock scroll.
   */
  lockScroll: {
    type: Boolean,
    default: true,
  },
  /**
   * 配置弹窗内置模块的 className header/body/footer/mask/wrapper
   * @en Configuration for class names.
   */
  classNames: {
    type: Object as PropType<{
      header?: string;
      body?: string;
      footer?: string;
      mask?: string;
      wrapper?: string;
    }>,
    required: false,
  },

  /**
   * 是否支持拖拽（仅在 组件默认 header 存在下有效，受限初始化设计，如果title为空，则该属性也不生效)
   * @en Configuration for draggable.
   */
  draggable: {
    type: Boolean,
    default: false,
  },
});

export type DialogProps = ExtractPropTypes<typeof useDialogProps>;
export type DialogSize = DialogProps['size'];
