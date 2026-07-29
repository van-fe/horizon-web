import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType, TeleportProps } from 'vue';
import { type ButtonProps } from '~/components/Button/src/composables/useProps';

export type DrawerSize = 'small' | 'medium' | 'large' | string | number;
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export const useDrawerProps = declarePropType({
  /**
   * 抽屉状态
   * @deprecated `visible`
    * @en Configuration for model value.
   **/
  modelValue: {
    type: Boolean,
    default: false,
    required: false,
  },

  /**
   * 抽屉的展示状态(v-model:visible)
    * @en Configuration for visible.
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
    * @en Configuration for v2.
   **/
  v2: {
    type: Boolean,
    default: false,
    required: false,
  },

  /**
   * 抽屉位置
   * @deprecated `placement`
    * @en Configuration for position.
   **/
  position: {
    type: String as PropType<DrawerPlacement>,
    default: 'right',
    required: false,
  },

  /**
   * 抽屉位置
    * @en Configuration for placement.
   **/
  placement: {
    type: String as PropType<DrawerPlacement>,
    required: false,
    default: 'right',
  },

  /** 抽屉标题
   * @en Configuration for title.
 */
  title: {
    type: String,
    required: false,
  },

  /** 抽屉尺寸，如果是数值会自动加上 `px`，也可以是字符串如 `40%`
   * @en Configuration for size.
 */
  size: {
    type: [Number, String] as PropType<DrawerSize>,
    required: false,
    default: 'medium',
  },

  /** 是否显示蒙层
   * @en Configuration for mask.
 */
  mask: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 点击蒙层是否关闭抽屉
   * @deprecated `maskClosable`
    * @en Configuration for mask close.
   **/
  maskClose: {
    type: Boolean,
    default: true,
    required: false,
  },

  /** 点击蒙层是否关闭抽屉，使用 `maskClosable` 替代
   * @en Configuration for mask closable.
 */
  maskClosable: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 按下 ESC 键是否关闭抽屉
   * @deprecated ，使用 `escClosable` 替代
    * @en Configuration for esc close.
   **/
  escClose: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 按下 ESC 键是否关闭抽屉
    * @en Configuration for esc closable.
   **/
  escClosable: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 是否显示右上角关闭按钮，只有设置了 `header=true` 才会生效
   * @deprecated `closable`
    * @en Configuration for close button.
   **/
  closeButton: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 是否显示右上角关闭按钮
    * @en Configuration for closable.
   **/
  closable: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 是否展示底部内容，当 `v2=true` 设置时候，忽略其他条件，仅判断 `footer`
    * @en Configuration for footer.
   **/
  footer: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否展示头部内容，当 `v2=true` 设置时候，忽略其他条件，仅判断 `footer`
    * @en Configuration for header.
   **/
  header: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否显示主要按钮
   * @deprecated `okButton`
    * @en Configuration for primary button.
   **/
  primaryButton: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 是否显示主要按钮
    * @en Configuration for ok button.
   **/
  okButton: {
    type: [Boolean, Object] as PropType<boolean | ButtonProps>,
    default: true,
    required: false,
  },

  /**
   * 主要按钮的文本
   * @deprecated `okButtonText`
    * @en Configuration for primary text.
   **/
  primaryText: {
    type: String,
    required: false,
  },

  /**
   * 主要按钮的文本
    * @en Configuration for ok button text.
   **/
  okButtonText: {
    type: String,
    required: false,
  },

  /**
   * 是否显示次要按钮
   * @deprecated `cancelButton`
    * @en Configuration for secondary button.
   **/
  secondaryButton: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * 是否显示次要按钮
    * @en Configuration for cancel button.
   **/
  cancelButton: {
    type: [Boolean, Object] as PropType<boolean | ButtonProps>,
    default: true,
    required: false,
  },

  /**
   * 次要按钮的文本
   * @deprecated `cancelButtonText`
    * @en Configuration for secondary text.
   **/
  secondaryText: {
    type: String,
    required: false,
  },

  /**
   * 次要按钮的文本
    * @en Configuration for cancel button text.
   **/
  cancelButtonText: {
    type: String,
    required: false,
  },

  /**
   * 关闭之前的回调，返回false 或者 Promise.resolve(false) 会停止关闭抽屉。
   * 传入close方法已过时，下个版本移除
   * PS：请注意默认close动作，都会在 beforeClose 后执行，等待 beforeClose 执行完成后触发
    * @en Configuration for before close.
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
    * @en Configuration for to body.
   **/
  toBody: {
    type: Boolean,
    default: false,
  },

  /**
   * 弹出框的挂载容器，和 `<teleport>` 保持一致，启用请使用启用 `v2` 属性
    * @en Configuration for to.
   **/
  to: {
    type: [String, Object] as PropType<string | TeleportProps['to'] | HTMLElement>,
    default: 'body',
  },
  /**
   * 是否在 `Drawer` 出现时将 `body` 滚动锁定
   * 如果没有设置，则在 `mask = true` 时自动开启
    * @en Configuration for lock scroll.
   */
  lockScroll: {
    type: Boolean,
    default: undefined,
  },

  /**
   * 启用则可以使用鼠标拖拽抽屉尺寸
    * @en Configuration for size draggable.
   */
  sizeDraggable: {
    type: Boolean,
    default: false,
  },

  /**
   * 启用抽屉推动行为，当启用时保持多个抽屉位置不变（**不推荐使用**）
   * @deprecated 不推荐使用
    * @en Configuration for push.
   */
  push: {
    type: [Boolean],
    default: false,
  },

  /*
   * 设置抽屉的加载状态
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * 关闭后是否销毁抽屉
    * @en Configuration for destroy on close.
   */
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
});

export type DrawerProps = ExtractPropTypes<typeof useDrawerProps>;
