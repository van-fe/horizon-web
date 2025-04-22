export interface AnchorListItem {
  id: string;
  title: string;
  children?: AnchorListItem[];
}

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
  const tempList = domList.map((it, index) => ({ val: it, index }));
  const curLevelList = tempList.filter(it => it.val.level === level);
  if (curLevelList.length !== 0 && curLevelList[0].index !== 0) {
    curLevelList.unshift({ val: { level: 0 }, index: -1 });
  }

  for (let i = 0; i < curLevelList.length; i++) {
    const startIndex = curLevelList[i].index;
    const endIndex = i === curLevelList.length - 1 ? domList.length : curLevelList[i + 1].index;
    const children = domList.slice(startIndex + 1, endIndex);
    curLevelList[i].val.children = genListByDomList(children, level + 1, []);
  }
  let res;
  if (curLevelList.length === 0 && domList.length !== 0) {
    res = [{ level, children: genListByDomList(domList, level + 1, []) }];
  } else {
    res = curLevelList.map(it => it.val);
  }
  res = res.map(item => {
    const curDom = item.dom;
    if (curDom && !curDom.id && curDom.innerText) {
      curDom.id = curDom.innerText;
    }
    return {
      id: curDom?.id,
      title: curDom?.innerText,
      children: item.children,
    };
  });
  list.push(...res);
  return list;
}
