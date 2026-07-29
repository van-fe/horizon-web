import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';

export const useDialogProps = declarePropType({
  /**
   * 绑定值，对话框状态
   * @deprecated 使用 `visible` 替代
    * @en Configuration for model value.
   */
  modelValue: {
    type: Boolean,
    default: false,
    required: false,
  },

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
   * 对话框垂直位置
   * `'center'`: 居中显示
   * `'top'`: 距顶部一定距离
   * @deprecated 已过时，直接设置 `top` 即可
    * @en Configuration for vertical position.
   */
  verticalPosition: {
    type: String as PropType<'center' | 'top'>,
    // default: 'center',
  },
  /**
   * 距顶部的距离
    * @en Configuration for top.
   */
  top: {
    type: [String, Number],
  },

  /** 对话框 `header` 和 `body` 的间距
   * @deprecated 已废弃，无任何作用
    * @en Configuration for header margin.
   */
  headerMargin: {
    type: [String, Number],
    // default: '24px',
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
   * 对话框图标大小
   * @deprecated
    * @en Configuration for icon size.
   */
  iconSize: {
    type: String,
    required: false,
    default: '24',
  },
  /**
   * 对话框图标颜色
    * @en Configuration for icon color.
   */
  iconColor: {
    type: String,
    required: false,
  },
  /**
   * 对话框尺寸
   * 除了内置的大小，也可以自定义宽度
   * 设计规范更新，后续废弃自定义宽度
    * @en Configuration for size.
   */
  size: {
    type: [String, Number] as PropType<'medium' | 'small' | 'large' | 'huge' | number>,
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
   * 是否显示主要按钮
   * @deprecated 使用 `okButtonProps` 替代
    * @en Configuration for primary button.
   */
  primaryButton: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 主要按钮的文本
   * @deprecated 使用 `okText` 替代
    * @en Configuration for primary text.
   */
  primaryText: {
    type: String,
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
   * 主要按钮的 props，传入一个对象，详见 [Button Props](button#Button%20Props)
   * @deprecated 使用 `okButtonProps` 替代
    * @en Configuration for primary button props.
   * */
  primaryButtonProps: {
    type: Object,
    required: false,
  },
  /**
   * 是否显示辅助按钮
   * @deprecated 使用 `cancelButtonProps` 替代
    * @en Configuration for secondary button.
   */
  secondaryButton: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 辅助按钮的文本
   * @deprecated 使用 `cancelText` 替代
    * @en Configuration for secondary text.
   */
  secondaryText: {
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

  /**
   * 辅助按钮的 props，传入一个对象，详见 [Button Props](button#Button%20Props)
   * @deprecated
    * @en Configuration for secondary button props.
   * */
  secondaryButtonProps: {
    type: Object,
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
   * 对话框的渲染方式，`if` 表示使用 `v-if`，`show` 表示使用 `v-show`
   * @deprecated 使用 `destroy-on-close` 替代
    * @en Configuration for display type.
   */
  displayType: {
    type: String as PropType<'if' | 'show'>,
    default: 'show',
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
   * 层级，会优先于整体维护的 `z-index` 值而使用
   * 此选项将会于 `v3` 版本移除，届时改为 `z-index` 即可
   * @deprecated
    * @en Configuration for prior zindex.
   */
  priorZIndex: {
    type: Number,
  },
  /**
   * 是否将 `Dialog` 挂载在 `body` 上
   * @deprecated 使用 `to` 替代
    * @en Configuration for to body.
   */
  toBody: {
    type: Boolean,
    default: true,
  },

  /**
   * 挂载节点
    * @en Configuration for to.
   */
  to: {
    type: [String, Object] as PropType<string | HTMLElement | null>,
    required: false,
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
