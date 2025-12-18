import type { VNode, VNodeArrayChildren, Slot } from 'vue';
import { isVNode, Text, Fragment, Comment } from 'vue';
import { unrefElement } from '@vueuse/core';

export function getSymbolNodeChildren(slotRender: Slot) {
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

  flatAction(slotRender());

  return res;
}

export function getTextNodeContent(node: VNode | VNode[]) {
  if (Array.isArray(node)) {
    return getTextNodeContent(node[0]);
  } else {
    if (Array.isArray(node.children)) {
      return getTextNodeContent(node.children as VNode[]);
    } else return node.type === Text ? node.children : undefined;
  }
}

export function getElement(target: string | HTMLElement | VNode | null | undefined) {
  if (typeof target === 'object') {
    if (isVNode(target)) {
      return target.el as HTMLElement | null;
    } else {
      return unrefElement(target);
    }
  } else if (typeof target === 'string') {
    return document.querySelector(target) as HTMLElement | null;
  }

  return null;
}

export function safelyGetEventTarget(evt: Event) {
  return evt.composedPath?.()?.[0] ?? evt.target;
}

/** 判断 `VNode` 是否是空节点 */
export function isVNodeEmpty(vNodes: Array<VNode>) {
  return vNodes.every((node: VNode) => {
    if (node.type === Comment) return true;

    if (node.type === Text && typeof node.children === 'string' && !node.children.trim()) {
      return true;
    }

    if (node.type === Fragment && isVNodeEmpty(node.children as Array<VNode>)) {
      return true;
    }

    return false;
  });
}
