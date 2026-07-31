import type {
  ModelValueSingleType,
  ModelValueType,
  HCascaderExtendOption,
  HCascaderOption,
} from './types';

export function transformModelValue(modelValue: ModelValueType) {
  if (Array.isArray(modelValue)) {
    if (Array.isArray(modelValue[0])) {
      return (modelValue as ModelValueSingleType[]).map(valuePath => valuePath.slice());
    } else if (modelValue.length > 0) {
      return [(modelValue as ModelValueSingleType).slice()];
    }
  }

  return [];
}

export function getTreeDataOriginData(treeDataList: HCascaderExtendOption[], level = 0) {
  const res: HCascaderOption[] = [];

  for (const opt of treeDataList) {
    if (level === 0 && !opt.isRoot) continue;

    const origin = opt.originOption;
    if (opt.transformedChildren?.length > 0) {
      origin.children = getTreeDataOriginData(opt.transformedChildren, level + 1);
    }

    res.push(origin);
  }

  return res;
}
