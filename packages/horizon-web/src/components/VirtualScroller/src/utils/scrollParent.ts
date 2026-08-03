// Fork of https://github.com/olahol/scrollparent.js to be able to build with Rollup

const regex = /(auto|scroll)/;

function parents(node: ParentNode | null, ps: Array<ParentNode | null>): Array<ParentNode | null> {
  if (node?.parentNode === null) {
    return ps;
  }

  return parents((node as ParentNode).parentNode, ps.concat([node]));
}

const style = function (node: Element, prop: string) {
  return getComputedStyle(node, null).getPropertyValue(prop);
};

const overflow = function (node: ParentNode) {
  return (
    style(node as Element, 'overflow') +
    style(node as Element, 'overflow-y') +
    style(node as Element, 'overflow-x')
  );
};

const scroll = function (node: ParentNode | null) {
  return regex.test(overflow(node as ParentNode));
};

/**
 * 找到node所有的父级节点中, 首个overlfow为auto或scroll的元素. 这就是node的滚动容器;
 * 找不到 就返回 document.scrollingElement
 * 再找不到 就返回 document.documentElement
 */
export function getScrollParent(node: HTMLElement | SVGElement): Element | null {
  if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
    return null;
  }

  const ps = parents(node.parentNode, []) as Element[];

  for (let i = 0; i < ps.length; i += 1) {
    if (scroll(ps[i])) {
      return ps[i];
    }
  }

  return document.scrollingElement || document.documentElement;
}
