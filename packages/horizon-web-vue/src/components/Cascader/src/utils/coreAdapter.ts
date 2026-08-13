import type { CascaderNormalizedOption } from '@aurora/core';
import type { HCascaderExtendOption, HCascaderOption } from './types';

const coreIds = new WeakMap<HCascaderExtendOption, number>();
let nextCoreId = 0;

function getCoreId(option: HCascaderExtendOption) {
  const existing = coreIds.get(option);
  if (existing !== undefined) return existing;
  const id = nextCoreId++;
  coreIds.set(option, id);
  return id;
}

/** 将 Vue Tree 扩展节点适配为 Core Cascader 节点，不改变公开 option 对象。 */
export function toCoreCascaderOption(
  option: HCascaderExtendOption,
  cache = new Map<HCascaderExtendOption, CascaderNormalizedOption<HCascaderOption>>(),
): CascaderNormalizedOption<HCascaderOption> {
  const cached = cache.get(option);
  if (cached) return cached;
  const normalized: CascaderNormalizedOption<HCascaderOption> = {
    id: getCoreId(option),
    value: option.value,
    label: option.label,
    stringLabel: option.stringLabel ?? String(option.value),
    disabled: option.disabled ?? false,
    passingDisabled: option.passingDisabled,
    selectable: option.selectable !== false,
    groupLabel: option.groupLabel,
    isLeaf: option.isLeaf ?? option.transformedChildren.length === 0,
    isRoot: option.isRoot,
    level: option.level,
    index: option._index,
    parent: null,
    children: [],
    path: option.path.slice(),
    labelPath: option.labels.slice(),
    originOption: option.originOption,
  };
  cache.set(option, normalized);
  normalized.parent = option.parent ? toCoreCascaderOption(option.parent, cache) : null;
  normalized.children = option.transformedChildren.map(child => toCoreCascaderOption(child, cache));
  return normalized;
}

export function toCoreCascaderOptions(options: readonly HCascaderExtendOption[]) {
  const cache = new Map<HCascaderExtendOption, CascaderNormalizedOption<HCascaderOption>>();
  return {
    options: options.map(option => toCoreCascaderOption(option, cache)),
    cache,
  };
}
