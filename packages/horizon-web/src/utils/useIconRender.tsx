import type { Component, VNode, Slot } from 'vue';
import { NIcon } from '@aurora/icon';
import { isDefined, isString } from '@aurora/utils';

export default function (
  icon: string | Component | VNode | undefined | null | false,
  iconSlot?: Slot,
  iconProps?: Record<string, unknown>,
) {
  return (isDefined(icon) && icon !== false) || isDefined(iconSlot)
    ? (iconSlot?.() ??
        (isString(icon) ? (
          <NIcon name={(icon as string).replace(/^n-icon_/, '')} {...(iconProps || {})} />
        ) : (
          <icon {...(iconProps || {})} />
        )))
    : undefined;
}
