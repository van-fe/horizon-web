import { isBoolean, isObject, isString } from '@aurora/utils';

export const useAnchorEmits = {
  /**
   * click事件
   * @param linkInfo 被点击的锚点的相关信息（子属性`href`和`title`均为使用组件时传递的属性）
   * @paramEn linkInfo The link info value.
   * @param e 原生的点击事件对象
   * @paramEn e The e value.
    * @en Emitted when click changes.
   */
  click: (linkInfo: { href: string; title: string }, e: MouseEvent) =>
    isObject(linkInfo) || e instanceof MouseEvent,
  /**
   * change事件
   * @param link 改变之后的锚点href
   * @paramEn link The link value.
   * @param prevLink 改变之前的锚点href
   * @paramEn prevLink The prev link value.
    * @en Emitted when change changes.
   */
  change: (link: string, prevLink: string) => isString(link) || isString(prevLink),
  /**
   * collapse 改变后的通知
   * @param collapse 改变之后是否为“折叠”状态
   * @paramEn collapse The collapse value.
    * @en Emitted when update:collapse changes.
   */
  'update:collapse': (collapse: boolean) => isBoolean(collapse),
};

export type AnchorEmits = typeof useAnchorEmits;
