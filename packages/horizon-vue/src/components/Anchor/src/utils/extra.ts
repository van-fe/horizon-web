import type { AnchorHeadingEntry, AnchorListItem } from '@aurora/core';
import { buildAnchorList } from '@aurora/core';

export type { AnchorListItem } from '@aurora/core';

export interface DomWithLevel {
  dom?: HTMLElement;
  level?: number;
  children?: DomWithLevel[];
}

/** 深度搜索符合规则的“标题DOM-数组” */
export function deepSearch(
  root: HTMLElement,
  condiFunc: (arg: HTMLElement) => number,
  list: DomWithLevel[] = [],
) {
  const curLevel = condiFunc(root);
  if (curLevel !== -1) {
    list.push({ dom: root, level: curLevel });
  }
  const allChildren = Array.from(root.children) as HTMLElement[];
  for (let i = 0; i < allChildren.length; i++) {
    const child = allChildren[i];
    deepSearch(child, condiFunc, list);
  }
  return list;
}

/** 根据“标题DOM-数组”生成用于渲染导航的嵌套数组 */
export function genListByDomList(domList: DomWithLevel[], level = 0, list: DomWithLevel[] = []) {
  void level;
  void list;
  const entries = domList.map(item => {
    const element = item.dom;
    const title = element?.innerText;
    if (element && !element.id && title) element.id = title;
    return {
      id: element?.id,
      title,
      level: item.level ?? 0,
    } satisfies AnchorHeadingEntry;
  });
  return buildAnchorList(entries);
}
