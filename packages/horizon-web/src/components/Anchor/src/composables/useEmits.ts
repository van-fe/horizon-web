import { isObject, isString } from '@aurora/utils';
import { isBoolean } from 'lodash';

export const useAnchorEmits = {
  /**
   * click事件
   * @param linkInfo 被点击的锚点的相关信息（子属性`href`和`title`均为使用组件时传递的属性）
   * @param e 原生的点击事件对象
   */
  click: (linkInfo: { href: string; title: string }, e: MouseEvent) =>
    isObject(linkInfo) || e instanceof MouseEvent,
  /**
   * change事件
   * @param link 改变之后的锚点href
   * @param prevLink 改变之前的锚点href
   */
  change: (link: string, prevLink: string) => isString(link) || isString(prevLink),
  /**
   * collapse 改变后的通知
   * @param collapse 改变之后是否为“折叠”状态
   */
  'update:collapse': (collapse: boolean) => isBoolean(collapse),
};

export type AnchorEmits = typeof useAnchorEmits;
