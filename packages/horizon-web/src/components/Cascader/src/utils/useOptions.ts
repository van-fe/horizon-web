import type {
  ModelValueSingleType,
  ModelValueType,
  NCascaderExtendOption,
  NCascaderOption,
  NCascaderUuidType,
} from './types';

export function transformModelValue(modelValue: ModelValueType) {
  if (Array.isArray(modelValue)) {
    if (Array.isArray(modelValue[0])) {
      return (modelValue as ModelValueSingleType[]).map(val => val.join(' / '));
    } else if (modelValue.length > 0) {
      return [modelValue.join(' / ')];
    }
  }

  return [];
}

export function transformUuidToModelValue(uuid: NCascaderUuidType[], multiple: boolean) {
  const values = uuid.map(item => item.toString().split(' / '));

  return multiple ? values : values[0];
}

export function getTreeDataOriginData(treeDataList: NCascaderExtendOption[], level = 0) {
  const res: NCascaderOption[] = [];

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
