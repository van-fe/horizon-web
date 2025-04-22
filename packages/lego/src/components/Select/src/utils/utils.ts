import isArrayLike from 'lodash/isArrayLike';
import { isBoolean, isNumber, isObject } from '@nio-fe/shared';
import isEqual from 'lodash/isEqual';
import { unwrapValueFormattedValue } from './valueFormat';
import type { ModelValueType } from '../composables/useProps';
import type { Slots, VNode, VNodeArrayChildren } from 'vue';
import { isVNode } from 'vue';

export function isMap(value: unknown): value is Map<unknown, unknown> {
  return Object.prototype.toString.call(value) === '[object Map]';
}

export function isSet(value: unknown): value is Set<unknown> {
  return Object.prototype.toString.call(value) === '[object Set]';
}

export function isEmpty(value: unknown) {
  if (value == null) return true;

  if (typeof value === 'string') {
    return false;
  }

  if (isArrayLike(value) && (Array.isArray(value) || typeof value === 'string')) {
    return !value.length;
  }

  if (isNumber(value)) {
    return false;
  }

  if (isObject(value)) {
    return false;
  }

  if (isMap(value) || isSet(value)) {
    return !value.size;
  }

  if (isBoolean(value)) {
    return false;
  }

  return true;
}

export function isEmptyArray(value1: unknown) {
  return Array.isArray(value1) && value1.length === 0;
}

/**
 * whether the two values are equal in loose mode
 * if the two values are in undefined / null / [], then judge them are equal
 */
export function isEqualLoose(value1: ModelValueType, value2: ModelValueType): boolean {
  if (isEmpty(value1) && isEmpty(value2)) return true;

  let val1 = value1;
  let val2 = value2;

  if (Array.isArray(val1)) {
    val1 = val1.map(curr => unwrapValueFormattedValue(curr));
  } else {
    val1 = unwrapValueFormattedValue(val1);
  }

  if (Array.isArray(val2)) {
    val2 = val2.map(curr => unwrapValueFormattedValue(curr));
  } else {
    val2 = unwrapValueFormattedValue(val2);
  }

  return isEqual(val1, val2);
}

/**
 * <n-option v-for="item in list">...</n-option>
 *  In this way, it will be compiled into a VNode with root node of type Symbol, So need take out children properties from root node.
 */
export const getSymbolNodeChildren = (slots: Slots, slotName: string) => {
  const res: VNode[] = [];

  function flatAction(vNodes: VNodeArrayChildren) {
    for (const vNode of vNodes) {
      if (isVNode(vNode)) {
        if (typeof vNode.type === 'symbol' && Array.isArray(vNode.children)) {
          flatAction(vNode.children);
        } else {
          res.push(vNode);
        }
      }
    }
  }

  flatAction(slots[slotName]?.() ?? []);

  return res;
};
