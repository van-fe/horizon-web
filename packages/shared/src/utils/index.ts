import { createTextVNode, Comment } from 'vue';
import type { VNode, Slot, VNodeChild } from 'vue';
import { pascalize, isVNodeEmpty } from '../helpers';

export function flattenVNodes(
  vNodes: VNodeChild[],
  filterCommentNode = true,
  result: VNode[] = [],
): VNode[] {
  vNodes.forEach(vNode => {
    if (vNode === null) return;
    if (typeof vNode !== 'object') {
      if (typeof vNode === 'string' || typeof vNode === 'number') {
        result.push(createTextVNode(String(vNode)));
      }
      return;
    }
    if (Array.isArray(vNode)) {
      flattenVNodes(vNode, filterCommentNode, result);
      return;
    }
    if (vNode.children && Array.isArray(vNode.children) && vNode.children.length) {
      flattenVNodes(vNode.children, filterCommentNode, result);
    } else if (vNode.type !== Comment) {
      result.push(vNode);
    }
  });
  return result;
}

export function slotVNodes(slot: Slot | undefined): VNode[] {
  return slot ? slot() : [];
}

/**
 * a-b-cd --> ABCd
 * ABc --> ABc
 */
export function transformTag(tag: string) {
  const tags = tag.split('-');
  if (tags.length === 1) return tag;
  return pascalize(tag);
}

export function compatible(vnode: VNode) {
  vnode.type = vnode.type || {
    name:
      (vnode as any)?.componentOptions?.Ctor?.extendOptions?.name ??
      transformTag((vnode as any)?.componentOptions?.tag ?? ''),
  };

  vnode.props = vnode.props || (vnode as any)?.componentOptions?.propsData;

  if (Array.isArray(vnode?.children)) {
    vnode.children.forEach(child => compatible(child as any));
  }
}

export function slotAdapter(slot?: Slot): VNode[] | undefined {
  if (!slot) return slot;
  const VNodes = slotVNodes(slot);
  /**
   * vue3 中v-for的slot.default()数组里是v-for的抽象组件，真正的组件在children里
   */
  let V3Nodes: VNode[] = [];

  VNodes?.filter(node => !isVNodeEmpty([node]))?.forEach(vnode => {
    if (vnode.type && !vnode.props) {
      // vue3 && v-for
      V3Nodes = V3Nodes.concat(vnode.children as VNode[]);
      return;
    }
    V3Nodes.push(vnode);
  });
  V3Nodes.forEach(vnode => compatible(vnode));

  return V3Nodes;
}

export function getTextWidth(text: string, fontSize = '14px') {
  // @ts-ignore
  // eslint-disable-next-line
  const canvas: HTMLCanvasElement = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  if (context) {
    context.font = `${fontSize} Blue Sky Standard-Regular, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif`;
    const metrics = context.measureText(text);
    return metrics.width;
  }
  return 0;
}

/**
 * 获取单位值
 * "14" -> "14px"
 * "14px" -> "14px"
 * "100%" -> "100%"
 * 14 -> "14px"
 */
export function getUnitString(val: any) {
  if (typeof val === 'string') {
    // "14"
    if (/^\d+$/.test(val)) {
      return `${val}px`;
    }
    // "14px", "100%"
    return val;
  }
  // 14
  if (typeof val === 'number') {
    return `${val}px`;
  }
  // undefined, null
  if (!val) {
    return '';
  }
  return String(val);
}

export * from './js';
export * from './style';
export * from './animation';
export * from './componentClassHelper';
export * from './install';
export * from './tsHelper';
export * from './dom';
export * from './validate';
export * from './component';
export * from './directive';
export * from './methods';
export * from './common-types';
export * from './adapter';
export * from './EventEmitter';
export * from './symbol';
export * from './precision';
export * from './checkHelper';
export * from './debug';
