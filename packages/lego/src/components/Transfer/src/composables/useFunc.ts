export const handleFlatTree = (treeArr: Array<any> | undefined, children = 'children') => {
  if (treeArr === undefined) return [];
  let result: Array<any> = [];
  for (const item of treeArr) {
    if (item[children]) {
      result = result.concat(handleFlatTree(item[children], children));
    }
    result.push(item);
  }
  return result;
};

export const handleFindTreeTarget = (
  treeArr: Array<any>,
  value: string,
  targetProp = 'children',
  backProp = 'children',
  children = 'children',
): any => {
  let result = null;
  for (const item of treeArr) {
    if (item[targetProp] === value) {
      return item[backProp];
    }
    if (item[children] && item[children]['length']) {
      result = handleFindTreeTarget(item[children], value, targetProp, backProp, children);
      if (result) {
        return result;
      }
    }
  }
  return result;
};
