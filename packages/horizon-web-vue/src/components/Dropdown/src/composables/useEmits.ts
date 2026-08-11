import type {
  AdaptComponentApiShape,
  ComponentEventValidators,
  DropdownEventMap,
  DropdownItemEventMap,
  DropdownSubmenuEventMap,
} from '@aurora/core';
import { isBoolean, isDefined } from '@aurora/utils';

type DropdownVueEvents = AdaptComponentApiShape<DropdownEventMap, { openChange: 'visibleChange' }>;
type DropdownItemVueEvents = AdaptComponentApiShape<
  DropdownItemEventMap<MouseEvent | KeyboardEvent>,
  { press: 'click' }
>;
type DropdownSubmenuVueEvents = AdaptComponentApiShape<
  DropdownSubmenuEventMap<MouseEvent | KeyboardEvent>,
  { press: 'click' }
>;

export const useDropdownEmits = {
  /** 菜单显隐变化。 @en Menu visibility changed. */
  visibleChange: (visible: boolean) => isBoolean(visible),
  /** 菜单命令。 @en Menu command. */
  command: (command: unknown) => isDefined(command),
  /** `visible` 双向绑定通知。 @en `visible` model update. */
  'update:visible': (visible: boolean) => isBoolean(visible),
} satisfies ComponentEventValidators<DropdownVueEvents> & {
  'update:visible': (visible: boolean) => boolean;
};

const isActivationEvent = (event: MouseEvent | KeyboardEvent) =>
  event instanceof MouseEvent || event instanceof KeyboardEvent;

export const useDropdownItemEmits = {
  /** 菜单项被激活。 @en Item activated. */
  click: isActivationEvent,
} satisfies ComponentEventValidators<DropdownItemVueEvents>;

export const useDropdownSubmenuEmits = {
  /** 子菜单触发器被激活。 @en Submenu trigger activated. */
  click: isActivationEvent,
} satisfies ComponentEventValidators<DropdownSubmenuVueEvents>;

export const useDropdownMenuEmits = {};
export const useDropdownGroupEmits = {};

export type DropdownEmits = typeof useDropdownEmits;
export type DropdownItemEmits = typeof useDropdownItemEmits;
export type DropdownMenuEmits = typeof useDropdownMenuEmits;
export type DropdownGroupEmits = typeof useDropdownGroupEmits;
export type DropdownSubmenuEmits = typeof useDropdownSubmenuEmits;
