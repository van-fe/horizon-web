import type { Component, PropType, VNode, Slot } from 'vue';
import { h, isVNode } from 'vue';
import { AIcon } from '@aurora/icon';

export const IconPropType = [String, Object] as PropType<string | Component | VNode>;
export const IconNullablePropType = [String, Object] as PropType<string | Component | VNode | null>;
export const IconMaybeFalsyPropType = [String, Object, Boolean] as PropType<
  string | Component | VNode | false
>;

function removeComparedObjectKeys(
  payload: Record<string, unknown> | undefined | null,
  compared: Record<string, unknown> | undefined | null,
) {
  if (!payload || !compared) return payload;

  const res = { ...payload };

  Object.entries(compared).forEach(([key]) => {
    if (res.hasOwnProperty(key)) {
      delete res[key];
    }
  });

  return res;
}

export function renderIcon(
  iconProp: string | Component | VNode | undefined | null | false,
  iconSlot?: Slot,
  iconAttrs?: Record<string, unknown>,
) {
  return iconProp === null || iconProp === false
    ? undefined
    : (iconSlot?.() ??
        (iconProp &&
          (typeof iconProp === 'string'
            ? h(AIcon, {
                name: iconProp,
                ...(iconAttrs || {}),
              })
            : isVNode(iconProp)
              ? h(iconProp, removeComparedObjectKeys(iconAttrs, iconProp?.props) || {})
              : h(iconProp, iconAttrs || {}))));
}
