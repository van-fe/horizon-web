import { declarePropType } from '@nio-fe/shared';
import type { ExtractPropTypes, PropType, TeleportProps } from 'vue';
import { type ButtonProps } from '~/components/Button/src/composables/useProps';

export type DrawerSize = 'small' | 'medium' | 'large' | string | number;
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export const useDrawerProps = declarePropType({
  /**
   * 抽屉状态
   * @deprecated `visible`
   **/
  modelValue: {
    type: Boolean,
    default: false,
    required: false,
  },

  /**
   * 抽屉的展示状态(v-model:visible)
   * @version `2.0.4`
   **/
  visible: {
    type: Boolean,
    required: false,
  },

  /**
   * 使用 `v2.x.x` 抽屉的设计逻辑
   * 影响: slots.title 和 slots.header 处理逻辑
   * - v2 = false: slots.title 会被整体渲染到抽屉头部
   * - v2 = true: slots.title 会被渲染到 slots.header 中，有层次关系
   * 请注意：如果设置 `v2=false`，同时设置新增属性header、footer、以及新增slots.header，依旧会按照新版本的逻辑处理
   **/
  v2: {
    type: Boolean,
    default: false,
    required: false,
  },

  /**
   * 抽屉位置
   * @deprecated `placement`
   **/
  position: {
    type: String as PropType<DrawerPlacement>,
    default: 'right',
    required: false,
  },

  /**
   * 抽屉位置
   * @version `2.0.4`
   **/
  placement: {
    type: String as PropType<DrawerPlacement>,
    required: false,
    default: 'right',
  },

  /** 抽屉标题 */
  title: {
    type: String,
    required: false,
  },

  /** 抽屉尺寸，如果是数值会自动加上 `px`，也可以是字符串如 `40%` */
  size: {
    type: [Number, String] as PropType<DrawerSize>,
    required: false,
    default: 'medium',
  },

  /** 是否显示蒙层 */
  mask: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 点击蒙层是否关闭抽屉
   * @deprecated `maskClosable`
   **/
  maskClose: {
    type: Boolean,
    default: true,
    required: false,
  },

  /** 点击蒙层是否关闭抽屉，使用 `maskClosable` 替代 */
  maskClosable: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 按下 ESC 键是否关闭抽屉
   * @deprecated ，使用 `escClosable` 替代
   **/
  escClose: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 按下 ESC 键是否关闭抽屉
   * @version `2.0.4`
   **/
  escClosable: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 是否显示右上角关闭按钮，只有设置了 `header=true` 才会生效
   * @deprecated `closable`
   **/
  closeButton: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 是否显示右上角关闭按钮
   * @version `2.0.4`
   **/
  closable: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 是否展示底部内容，当 `v2=true` 设置时候，忽略其他条件，仅判断 `footer`
   * @version `2.0.4`
   **/
  footer: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否展示头部内容，当 `v2=true` 设置时候，忽略其他条件，仅判断 `footer`
   * @version `2.0.4`
   **/
  header: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否显示主要按钮
   * @deprecated `okButton`
   **/
  primaryButton: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 是否显示主要按钮
   * @version `2.0.4`
   **/
  okButton: {
    type: [Boolean, Object] as PropType<boolean | ButtonProps>,
    default: true,
    required: false,
  },

  /**
   * 主要按钮的文本
   * @deprecated `okButtonText`
   **/
  primaryText: {
    type: String,
    required: false,
  },

  /**
   * 主要按钮的文本
   * @version `2.0.4`
   **/
  okButtonText: {
    type: String,
    required: false,
  },

  /**
   * 是否显示次要按钮
   * @deprecated `cancelButton`
   **/
  secondaryButton: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 是否显示次要按钮
   * @version `2.0.4`
   **/
  cancelButton: {
    type: [Boolean, Object] as PropType<boolean | ButtonProps>,
    default: true,
    required: false,
  },

  /**
   * 次要按钮的文本
   * @deprecated `cancelButtonText`
   **/
  secondaryText: {
    type: String,
    required: false,
  },

  /**
   * 次要按钮的文本
   * @version `2.0.4`
   **/
  cancelButtonText: {
    type: String,
    required: false,
  },

  /**
   * 关闭之前的回调，返回false 或者 Promise.resolve(false) 会停止关闭抽屉。
   * 传入close方法已过时，下个版本移除
   * PS：请注意默认close动作，都会在 beforeClose 后执行，等待 beforeClose 执行完成后触发
   **/
  beforeClose: {
    type: Function as PropType<
      (close?: () => void) => void | boolean | PromiseLike<boolean | void>
    >,
    required: false,
  },

  /**
   * 是否将 `drawer` 挂载在 `body` 上
   * @deprecated `to`
   **/
  toBody: {
    type: Boolean,
    default: false,
  },

  /**
   * 弹出框的挂载容器，和 `<teleport>` 保持一致，启用请使用启用 `v2` 属性
   * @version `2.0.4`
   **/
  to: {
    type: [String, HTMLElement] as PropType<string | TeleportProps['to']>,
    default: 'body',
  },
  /**
   * 是否在 `Drawer` 出现时将 `body` 滚动锁定
   * 如果没有设置，则在 `mask = true` 时自动开启
   * @version 2.7.0
   */
  lockScroll: {
    type: Boolean,
    default: undefined,
  },

  /**
   * 启用则可以使用鼠标拖拽抽屉尺寸
   * @version 2.10.0
   */
  sizeDraggable: {
    type: Boolean,
    default: false,
  },

  /**
   * 启用抽屉推动行为，当启用时保持多个抽屉位置不变（**不推荐使用**）
   * @version 2.10.0
   * @deprecated 不推荐使用
   */
  push: {
    type: [Boolean],
    default: false,
  },

  /*
   * 设置抽屉的加载状态
   * @version 2.8.2
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * 关闭后是否销毁抽屉
   * @version 2.11.6
   */
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
});

export type DrawerProps = ExtractPropTypes<typeof useDrawerProps>;
