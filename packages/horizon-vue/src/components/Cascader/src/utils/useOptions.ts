import type {
  ModelValueSingleType,
  ModelValueType,
  HCascaderExtendOption,
  HCascaderOption,
} from './types';
import { normalizeCascaderModelValue } from '@aurora/core';

export function transformModelValue(modelValue: ModelValueType) {
  return normalizeCascaderModelValue(modelValue) as ModelValueSingleType[];
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
