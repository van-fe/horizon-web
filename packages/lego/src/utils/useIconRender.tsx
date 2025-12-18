import type { Component, VNode, Slot } from 'vue';
import { NIcon } from '@nio-fe/icon';
import { isDefined, isString } from '@nio-fe/shared';

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
