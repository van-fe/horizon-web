import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/shared';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';

export const useDialogProps = declarePropType({
  /**
   * 绑定值，对话框状态
   * @deprecated 使用 `visible` 替代
   */
  modelValue: {
    type: Boolean,
    default: false,
    required: false,
  },

  /**
   * 控制对话框展示，支持 `v-model:visible`
   * @version 2.12.0
   */
  visible: {
    type: Boolean,
    default: false,
    required: false,
  },
  /**
   * 对话框标题
   */
  title: {
    type: String,
    required: false,
  },
  /**
   * 对话框垂直位置
   * `'center'`: 居中显示
   * `'top'`: 距顶部一定距离
   * @deprecated 已过时，直接设置 `top` 即可
   */
  verticalPosition: {
    type: String as PropType<'center' | 'top'>,
    // default: 'center',
  },
  /**
   * 距顶部的距离
   */
  top: {
    type: [String, Number],
  },

  /** 对话框 `header` 和 `body` 的间距
   * @deprecated 已废弃，无任何作用
   */
  headerMargin: {
    type: [String, Number],
    // default: '24px',
  },
  /**
   * 对话框图标名称
   * 当设置了 `title` 或插槽时，图标位置在 `title` 之前，否则图标在默认插槽之前
   */
  iconName: {
    type: String,
    required: false,
  },
  /**
   * 对话框图标大小
   * @deprecated
   */
  iconSize: {
    type: String,
    required: false,
    default: '24',
  },
  /**
   * 对话框图标颜色
   */
  iconColor: {
    type: String,
    required: false,
  },
  /**
   * 对话框尺寸
   * 除了内置的大小，也可以自定义宽度
   * 设计规范更新，后续废弃自定义宽度
   */
  size: {
    type: [String, Number] as PropType<'medium' | 'small' | 'large' | 'huge' | number>,
    required: false,
  },
  /**
   * 是否显示蒙层
   */
  mask: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 点击蒙层是否关闭对话框
   */
  maskClose: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 按下 ESC 键是否关闭对话框
   */
  escClose: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 是否显示右上角关闭按钮
   * 只有设置了 `title` 才会生效，如果你不想显示标题但又希望显示关闭按钮，可以将 `title` 设为空格
   */
  closeButton: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 是否显示主要按钮
   * @deprecated 使用 `okButtonProps` 替代
   */
  primaryButton: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 主要按钮的文本
   * @deprecated 使用 `okText` 替代
   */
  primaryText: {
    type: String,
    required: false,
  },

  /**
   * 显示主要按钮以及设置按钮属性
   * @version 2.12.0
   */
  okButtonProps: {
    type: [Boolean, Object] as PropType<boolean | Partial<ButtonProps>>,
    default: () => ({}),
    required: false,
  },

  /**
   * 主要按钮的文本
   * @version 2.12.0
   */
  okText: {
    type: String,
    required: false,
  },

  /**
   * 主要按钮的 props，传入一个对象，详见 [Button Props](button#Button%20Props)
   * @deprecated 使用 `okButtonProps` 替代
   * */
  primaryButtonProps: {
    type: Object,
    required: false,
  },
  /**
   * 是否显示辅助按钮
   * @deprecated 使用 `cancelButtonProps` 替代
   */
  secondaryButton: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 辅助按钮的文本
   * @deprecated 使用 `cancelText` 替代
   */
  secondaryText: {
    type: String,
    required: false,
  },

  /**
   * 显示次要按钮以及设置按钮属性
   * @version 2.12.0
   */
  cancelButtonProps: {
    type: [Boolean, Object] as PropType<boolean | Partial<ButtonProps>>,
    default: () => ({}),
    required: false,
  },
  /**
   * 辅助按钮的文本
   * @version 2.12.0
   */
  cancelText: {
    type: String,
    required: false,
  },

  /**
   * 辅助按钮的 props，传入一个对象，详见 [Button Props](button#Button%20Props)
   * @deprecated
   * */
  secondaryButtonProps: {
    type: Object,
    required: false,
  },
  /** 关闭之前的回调，会停止关闭对话框，除非手动调用传入的 `close` 方法。  */
  beforeClose: {
    type: Function as PropType<(close: () => void) => void>,
    required: false,
  },
  /**
   * 对话框的渲染方式，`if` 表示使用 `v-if`，`show` 表示使用 `v-show`
   * @deprecated 使用 `destroy-on-close` 替代
   */
  displayType: {
    type: String as PropType<'if' | 'show'>,
    default: 'show',
  },

  /**
   * 是否在关闭时销毁对话框
   * @version 2.12.0
   */
  destroyOnClose: {
    type: Boolean,
    default: false,
  },

  /** CSS 层级 */
  zIndex: {
    type: Number,
    required: false,
  },
  /**
   * 层级，会优先于整体维护的 `z-index` 值而使用
   * 此选项将会于 `v3` 版本移除，届时改为 `z-index` 即可
   * @version 2.4.4
   * @deprecated
   */
  priorZIndex: {
    type: Number,
  },
  /**
   * 是否将 `Dialog` 挂载在 `body` 上
   * @deprecated 使用 `to` 替代
   */
  toBody: {
    type: Boolean,
    default: true,
  },

  /**
   * 挂载节点
   * @version 2.12.0
   */
  to: {
    type: [String, Object] as PropType<string | HTMLElement | null>,
    required: false,
  },

  /**
   * 是否在 `Dialog` 出现时将 `body` 滚动锁定
   */
  lockScroll: {
    type: Boolean,
    default: true,
  },
  /**
   * 配置弹窗内置模块的 className header/body/footer/mask/wrapper
   * @version 2.5.0
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
   * @version 2.12.0
   */
  draggable: {
    type: Boolean,
    default: false,
  },
});

export type DialogProps = ExtractPropTypes<typeof useDialogProps>;
export type DialogSize = DialogProps['size'];
