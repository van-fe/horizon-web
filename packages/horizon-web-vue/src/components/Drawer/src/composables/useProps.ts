import type {
  AdaptComponentApiShape,
  ComponentRendererPropDefinitions,
  DrawerCommonProps,
  DrawerPlacement as CoreDrawerPlacement,
  DrawerSize as CoreDrawerSize,
} from '@aurora/core';
import {
  DRAWER_DEFAULTS,
  isDialogButtonOptions,
  isDrawerPlacement,
  isDrawerSize,
} from '@aurora/core';
import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType, TeleportProps } from 'vue';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';

type DrawerVueProps = AdaptComponentApiShape<
  DrawerCommonProps<Partial<ButtonProps>, Partial<ButtonProps>>,
  { open: 'visible' },
  'defaultOpen',
  {
    /** Teleport 挂载目标。 @en Teleport mount target. */
    to?: TeleportProps['to'] | null;
    /** 无可见标题时的可访问名称。 @en Accessible name when no visible title exists. */
    ariaLabel?: string;
  }
>;

export const useDrawerProps = declarePropType({
  /** 抽屉的展示状态，支持 `v-model:visible`。 @en Controlled visibility. */
  visible: {
    type: Boolean,
    default: DRAWER_DEFAULTS.defaultOpen,
    required: false,
  },
  /** 抽屉位置。 @en Side from which the drawer opens. */
  placement: {
    type: String as PropType<CoreDrawerPlacement>,
    required: false,
    default: DRAWER_DEFAULTS.placement,
    validator: isDrawerPlacement,
  },
  /** 抽屉标题。 @en Drawer title. */
  title: { type: String, required: false },
  /** 无可见标题时的可访问名称。 @en Accessible name when no visible title exists. */
  ariaLabel: { type: String, required: false },
  /** 抽屉尺寸；数值自动使用 px，也支持百分比等 CSS 长度。 @en Drawer extent. */
  size: {
    type: [Number, String] as PropType<CoreDrawerSize>,
    required: false,
    default: DRAWER_DEFAULTS.size,
    validator: isDrawerSize,
  },
  /** 是否显示蒙层。 @en Whether to show the mask. */
  mask: { type: Boolean, default: DRAWER_DEFAULTS.mask, required: false },
  /** 点击蒙层是否请求关闭。 @en Whether a mask click requests closing. */
  maskClosable: { type: Boolean, default: DRAWER_DEFAULTS.maskClosable, required: false },
  /** 按下 Escape 是否请求关闭。 @en Whether Escape requests closing. */
  escClosable: { type: Boolean, default: DRAWER_DEFAULTS.escClosable, required: false },
  /** 是否显示标题栏关闭按钮。 @en Whether to show the close button. */
  closable: { type: Boolean, default: DRAWER_DEFAULTS.closable, required: false },
  /** 是否展示底部内容。 @en Whether to show the footer. */
  footer: { type: Boolean, default: DRAWER_DEFAULTS.footer },
  /** 是否展示头部内容。 @en Whether to show the header. */
  header: { type: Boolean, default: DRAWER_DEFAULTS.header },
  /** 是否显示主要按钮或设置其属性。 @en Confirm action visibility or props. */
  okButton: {
    type: [Boolean, Object] as PropType<boolean | Partial<ButtonProps>>,
    default: DRAWER_DEFAULTS.okButton,
    validator: isDialogButtonOptions,
    required: false,
  },
  /** 主要按钮文本。 @en Confirm action label. */
  okButtonText: { type: String, required: false },
  /** 是否显示次要按钮或设置其属性。 @en Cancel action visibility or props. */
  cancelButton: {
    type: [Boolean, Object] as PropType<boolean | Partial<ButtonProps>>,
    default: DRAWER_DEFAULTS.cancelButton,
    validator: isDialogButtonOptions,
    required: false,
  },
  /** 次要按钮文本。 @en Cancel action label. */
  cancelButtonText: { type: String, required: false },
  /** 返回 false 或拒绝 Promise 时阻止关闭。 @en Prevents closing on false or rejection. */
  beforeClose: {
    type: Function as PropType<DrawerVueProps['beforeClose']>,
    required: false,
  },
  /** Teleport 挂载目标。 @en Teleport mount target. */
  to: {
    type: [String, Object] as PropType<TeleportProps['to'] | null>,
    default: 'body',
  },
  /** 是否锁定背景滚动；未设置时跟随 mask。 @en Background scroll lock strategy. */
  lockScroll: { type: Boolean, default: undefined },
  /** 是否允许指针拖拽调整尺寸。 @en Whether pointer resizing is enabled. */
  sizeDraggable: { type: Boolean, default: DRAWER_DEFAULTS.sizeDraggable },
  /** 主要按钮加载状态。 @en Confirm action loading state. */
  loading: { type: Boolean, default: DRAWER_DEFAULTS.loading },
  /** 关闭后是否销毁内容。 @en Whether to unmount content after closing. */
  destroyOnClose: { type: Boolean, default: DRAWER_DEFAULTS.destroyOnClose },
} satisfies ComponentRendererPropDefinitions<DrawerVueProps>);

export type DrawerProps = ExtractPropTypes<typeof useDrawerProps>;
export type DrawerSize = CoreDrawerSize;
export type DrawerPlacement = CoreDrawerPlacement;
